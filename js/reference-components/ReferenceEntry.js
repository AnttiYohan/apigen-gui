import 
{ 
    referenceValues
} from '../dtos.js';
import { WCBase } from '../WCBase.js';
import { MultiEntry } from '../MultiEntry.js';
import { ListSelector } from '../ListSelector.js';
import { ActionSettings } from './ActionSettings.js';

/**
 * This is a singluar 'reference' entry element.
 * The element is fully editable.
 * 'Reference' denotes a foreign key reference,
 * used in relational databases.
 * ReferenceEntry stores the properties of one such field.
 * ---------
 * Usage:
 * ReferenceEntry entities are intended to be stored and managed
 * by one ReferenceStore object.
 * ---------
 * Properties:
 * - id          : integer           * optional, immutable, hidden
 * - fields      : map
 * - ref_table   : string
 * - actions     : map
 * 
 * Members:
 * - available_tables : map         * immutable, hidden
 * 
 *  
 * @emits field-entry-connected
 */
class ReferenceEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mId              = 0;
        this.mName            = '';
        this.mFields          = new Map();
        this.mReferenceTable  = '';
        this.mActions         = new Map();
        this.mAvailableTables = [];

        /**
         * Generate the data-group value,
         * as a serialized array of strings
         * These are the available table's in the
         * schema
         */
        let group = '[';
        let index = 0;
        if ( 'available_tables' in options && Array.isArray( options.available_tables ) )
        {
            for ( const table of options.available_tables )
            {
                if ( index ) group += ',';
                group += `"${table}"`;
                index++;
                this.mAvailableTables.push( table );
            }
        }

        group += ']';

        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate
        (`<link rel='stylesheet' href='assets/css/style.css'>
          <div class='reference create'>
            <multi-entry data-dir='wrap'></multi-entry>
            <list-selector data-group='${group}'></list-selector>
            <action-settings></action-settings>
            <button class='component__action--remove'></button>
          </div>`);
        
        this.setupStyle
        (`.reference {
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
        .reference.create,
        .reference.remove {
            /*height: 0px;*/
            opacity: 0;
            margin-bottom: -100%;
            transform: scaleY(0);
        }`);

        /**
         * Reference entry inputs
         */
        this.mRootElement         = this.shadowRoot.querySelector( '.reference' );
        this.mFieldsInput         = this.shadowRoot.querySelector( 'multi-entry' );
        this.mReferenceTableInput = this.shadowRoot.querySelector( 'list-selector' );
        this.mActionsInput        = this.shadowRoot.querySelector( 'action-settings' );
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
     * Return the referenced table name
     * @return {string}
     */
    get referenceTable()
    {
        return this.mReferenceTableInput.value;
    }

    /**
     * Return the update/delete event actions
     * @return {object}
     */
    get actions()
    {
        return this.mActionsInput.value;
    }

    /**
     * Return the entity properties
     * @return {object}
     */
    get value()
    {
        return {

            fields:    this.fields,
            ref_table: this.referenceTable,
            actions:   this.actions

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
            const opacity = this.mRootElement.style.opacity;
            console.log( `Opacity found, ${opacity}` );
            super.remove();
        }
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( "<reference-entry> connected" );
        this.emit( 'reference-entry-connected' );
        this.mRemoveFlag = false;
        this.mRootElement.classList.remove( 'create' );
    }

    disconnectedCallback()
    {
        console.log( '<reference-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'reference-entry', ReferenceEntry );

export { ReferenceEntry };