import 
{ 

    constraintMap, 
    fieldValues 

} from '../dtos.js';

import { WCBase } from '../WCBase.js';
import { TypeSelector } from './TypeSelector.js';
import { ConstraintSelector} from './ConstraintSelector.js';


/**
 * This is a singluar 'field' entry element.
 * 'Field' denotes a field or a column
 * of a database table.
 * FieldEntry stores the properties of one such field.
 * ---------
 * Usage:
 * FieldEntry entities are intended to be stored and managed
 * by one FieldStore object.
 * ---------
 * Properties:
 * - id          : integer            *optional, immutable, hidden
 * - type        : string
 * - size        : integer            *optional
 * - constraints : map
 * - primary_key : boolean
 * 
 *  
 * @emits field-entry-connected
 */
class FieldEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mId          = 0;
        this.mName        = '';
        this.mType        = '';
        this.mSize        = 0;
        this.mConstraints = new Map();
        this.mPrimaryKey  = false;

        /**
         * Check for id
         */
        if ( 'id' in options )
        {
            this.mId = options.id;
        }

        const { name, type, size } = fieldValues( options );
        this.mName = name;
        this.mType = type;
        this.mSize = size;
        this.mConstraints = constraintMap( options );
        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='field create'>
            <input class='field__name' type='text'>
            <type-selector></type-selector>
            <input class='field__size' type='number'>
            <constraint-selector></constraint-selector>
            <toggle-switch data-hide='true'></toggle-switch>
            <button class='component__action--remove'></button>
        </div>`);
        
        this.setupStyle(
        `.field {
            position: relative;
            display: flex;
            align-items: center;
            min-height: 48px;
            background-color: #446;
            box-shadow: inset 0 8px 10px -4px rgba(255, 250, 240, 0.33);
            opacity: 1;
            margin-bottom: 0px;
            transform-origin: top;
            transition: transform 500ms ease, opacity 500ms ease, margin-bottom 500ms ease;
        }
        .field.create,
        .field.remove {
            /*height: 0px;*/
            opacity: 0;
            margin-bottom: -100%;
            transform: scaleY(0.05);
        }
        .field__name {
            min-width: 128px;
            max-width: 280px;
            margin: 0 4px;
            padding: 4px;
        }
        .field__size {
            width: 48px;
        }
        .field__name,
        .field__size {
            outline: 0;
            border: 2px solid transparent;
            box-shadow: 
            0 0 2px -1px rgba(255, 255, 255, .3),
            inset 0 -8 12px -4px rgba(0, 0, 0, .25);
            transition: border-color 300ms ease;
        }
        .field__name:focus,
        .field__size:focus {
            border-color: rgba(240, 40, 40, .67);
        }`);

    
        /**
         * The applied constraint icons
         */
        this.mRootElement      = this.shadowRoot.querySelector( '.field' );
        this.mConstraintIcons  = this.shadowRoot.querySelector( '.field__constraint-icons' );
        this.mNameInput        = this.shadowRoot.querySelector( '.field__name' );
        this.mSizeInput        = this.shadowRoot.querySelector( '.field__size' );
        this.mTypeInput        = this.shadowRoot.querySelector( 'type-selector' );
        this.mConstraintInput  = this.shadowRoot.querySelector( 'constraint-selector' );
        const removeButton     = this.shadowRoot.querySelector( '.component__action--remove' );
        
        this.mRootElement.addEventListener( 'transitionend', e => this.handleTransitionEnd( e ) );
        removeButton.addEventListener( 'click', e => this.remove() );
    }

    // --------------------------------------
    // -
    // - Getters for field properties
    // -
    // --------------------------------------

    /**
     * Returns the optional id,
     * if it was set at construction.
     * @return {number}
     */
    get id()
    {
        return this.mId;
    }

    /**
     * Returns the field's name
     * @return {string} field name
     */
    get name()
    {
        return this.mNameInput.value;
    }

    /**
     * Returns the field's type
     * @return {string}
     */
    get type()
    {
        return this.mTypeInput.value;
    }

    /**
     * Returns the field's size (optional)
     * @return {number}
     */
    get size()
    {
        return this.mSizeInput.value;
    }

    /**
     * Returns the field's constraints
     * @return {Map}
     */
    get constraints()
    {
        return this.mConstraintInput.value;
    }

    /**
     * Returns the field's primary ket state
     * @return {boolean}
     */
    get primaryKey()
    {
        return this.mPrimaryKeyInput.value;
    }

    /**
     * Return the field value
     * properties:
     * - id             *optional
     * - name
     * - type
     * - size           *optional
     * - constraints
     * - primary_key
     * 
     * @return {object}
     */
    get value()
    {
        return {

            id:          this.id,
            name:        this.name,
            type:        this.type,
            size:        this.size,
            constraints: this.constraints,
            primary_key: this.primaryKey

        };
    }
    
    /**
     * Prepary for element destruction.
     * Set the remove-flag, and initiate the
     * removal transition.
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

    connectedCallback()
    {
        console.log( "<field-entry> connected" );
        this.emit( 'field-entry-connected' );
        this.mRemoveFlag = false;
        this.mRootElement.classList.remove( 'create' );
    }

    disconnectedCallback()
    {
        console.log( '<field-entry> disconnected' );
    }
}
 
window.customElements.define( 'field-entry', FieldEntry );

export { FieldEntry };