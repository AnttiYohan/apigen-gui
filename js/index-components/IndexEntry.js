import { WCBase } from '../WCBase.js';
import { MultiEntry } from '../MultiEntry.js';
import { ListSelector } from '../ListSelector.js';

/**
 * This is a singluar 'index' entry element.
 * The element is fully editable.
 * 'Index' denotes a relational database table index
 * IndexEntry stores the properties of one such index.
 * ---------
 * Usage:
 * IndexEntry entities are intended to be stored and managed
 * by one IndexStore object.
 * ---------
 * Properties:
 * - id          : integer           * optional, immutable, hidden
 * - name        : string            * optional
 * - fields      : map
 * - type        : string
 * - table       : string            * optional, immutable, hidden
 *  
 * @emits index-entry-connected
 */
class IndexEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Index property members
         */
        this.mId              = 0;
        this.mName            = '';
        this.mType            = '';
        this.mFields          = new Map();
        this.mTable           = '';

        /**
         * Parse the available views
         * 
         * if the available field set is changed
         * in the future, events are
         * sent from the field store
         */
        this.mAvailableFields = [];
    
        if ( 'available_fields' in options && Array.isArray( options.available_fields ) )
        {
            for ( const field of options.available_fields )
            {
                this.mAvailableTables.push( table );
            }
        }

        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate
        (`<link rel='stylesheet' href='assets/css/style.css'>
          <div class='index create'>
            <multi-entry data-dir='wrap'></multi-entry>
            <list-selector data-group='[
                "default",
                "unique",
                "text"
            ]'></list-selector>
            <button class='component__action--remove'></button>
          </div>`);
        
        this.setupStyle
        (`.index {
            position: relative;
            display: flex;
            align-items: center;
            min-height: 48px;
            background-color: #446;
            box-shadow: inset 0 8px 10px -4px rgba(255, 250, 240, 0.33);
            opacity: 1;
            margin-bottom: 0;
            transform-origin: top;
            transform: scaleY(1);
            transition: transform 500ms ease, opacity 500ms ease, margin-bottom 500ms ease;
        }
        .index.create,
        .index.remove {
            /*height: 0px;*/
            opacity: 0;
            margin-bottom: -100%;
            transform: scaleY(0);
        }`);

        /**
         * Reference entry inputs
         */
        this.mRootElement         = this.shadowRoot.querySelector( '.index' );
        this.mFieldsInput         = this.shadowRoot.querySelector( 'multi-entry' );
        this.mTypeInput           = this.shadowRoot.querySelector( 'list-selector' );
        const removeButton        = this.shadowRoot.querySelector( '.component__action--remove' );
        
        this.mRootElement.addEventListener( 'transitionend', e => this.handleTransitionEnd( e ) );
        removeButton.addEventListener( 'click', e => this.remove() );

    }
    
    /**
     * Return the map of key fields
     * @return {array}
     */
    get fields()
    {
        return this.mFieldsInput.value;
    }

    /**
     * Return the used type
     * @return {string}
     */
    get type()
    {
        this.mTypeInput.value;
    }

    /**
     * Return the referenced table name
     * @return {string}
     */
    get table()
    {
        return this.mReferenceTableInput.value;
    }

    /**
     * Return the entity properties
     * @return {object}
     */
    get value()
    {
        return {

            name:   this.name,
            type:   this.type,
            table:  this.table,
            fields: this.fields,
            
        };
    }

    /**
     * Initiates the element destruction transition.
     * When 'transitionend' event is received,
     * the element is removed.
     */
    remove()
    {
        this.mRemoveFlag = true;
        this.mRootElement.classList.add( 'remove' );
    }

    /**
     * Handler the transitionend events,
     * checks if the transition was associated with
     * the element removal process.
     * -------
     * If the remove button was pressed, the element
     * is removed.
     * -------
     * @param {Event} e 
     */
    handleTransitionEnd( e )
    {
        if ( this.mRemoveFlag )
        {
            super.remove();
        }
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    pushAvailableFields( e )
    {

    }

    /**
     * Finish the initialization after the entry is connected
     * to the DOM
     * @emits index-entry-connected
     */
    connectedCallback()
    {
        console.log( '<index-entry> connected' );
        this.emit( 'index-entry-connected' );
        this.mRemoveFlag = false;
        this.mRootElement.classList.remove( 'create' );

        this.listen( 'field-set', e => this.pushAvailableFields( e ) );
    }

    disconnectedCallback()
    {
        console.log( '<index-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'index-entry', IndexEntry );

export { IndexEntry };