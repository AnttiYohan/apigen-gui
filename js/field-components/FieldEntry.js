import 
{ 

    constraintMap, 
    fieldValues 

} from '../dtos.js';

import { WCBase } from '../WCBase.js';
import { TypeSelector } from './TypeSelector.js';
import { ConstraintSelector} from './ConstraintSelector.js';


/**
 * This is an singluar entry element
 * used in the FieldStore
 * Data stored:
 * - field id
 * - field key/name
 * - field type
 * - field size
 * - field constraints
 * - field references
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
        this.mReferences  = [];

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
        <div class='field'>
            <input class='field__name' type='text'>
            <type-selector></type-selector>
            <input class='field__size' type='number'>
            <constraint-selector></constraint-selector>
            <toggle-switch data-hide='true'></toggle-switch>
        </div>`
        );
        
        this.setupStyle(
        `.field {
            position: relative;
            display: flex;
            align-items: center;
            min-height: 48px;
            background-color: #446;
            box-shadow: inset 0 8px 10px -4px rgba(255, 250, 240, 0.33);
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
        this.mConstraintIcons  = this.shadowRoot.querySelector( '.field__constraint-icons' );
        this.mNameInput        = this.shadowRoot.querySelector( '.field__name' );
        this.mSizeInput        = this.shadowRoot.querySelector( '.field__size' );
    }

    /**
     * Return the image and the text content
     * 
     * @return {object}
     */
    get value()
    {
        return {

            id:     this.mId,
            name:   this.mName
        }
    }
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( "<field-entry> connected" );
        this.emit( 'field-entry-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<field-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'field-entry', FieldEntry );

export { FieldEntry };