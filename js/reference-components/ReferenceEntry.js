import 
{ 
    referenceValues
} from '../dtos.js';
import { WCBase } from '../WCBase.js';
import { MultiEntry } from '../MultiEntry.js';

/**
 * This is an singluar entry element
 * used in the ReferenceStore
 * Data stored:
 * - field names
 * - reference table name
 * - reference field names *optional
 * 
 *  
 * @emits reference-entry-connected
 */
class ReferenceEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mId             = 0;
        this.mName           = '';
        this.mFields         = [];
        this.mReferenceTable = '';

        this.mAvailableFields = [];

        if ( 'available_fields' in options && Array.isArray( options.available_fields ) )
        {
            for ( const field of options.available_fields )
            {
                this.mAvailableFields.push( field );
            }
        }
        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate
        (`<link rel='stylesheet' href='assets/css/style.css'>
          <div class='reference'>
            <multi-entry data-dir='wrap'></multi-entry>
          </div>`);
        
        this.setupStyle
        (`.reference {
            position: relative;
            display: flex;
            align-items: center;
            min-height: 48px;
            background-color: #446;
            box-shadow: inset 0 8px 10px -4px rgba(255, 250, 240, 0.33);
        }`);

        this.mFieldsInput = this.shadowRoot.querySelector( 'multi-select' );
    }

    /**
     * Return the image and the text content
     * 
     * @return {object}
     */
    get value()
    {
        return {

            fields: []

        }
    }
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( "<reference-entry> connected" );
        this.emit( 'reference-entry-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<reference-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'reference-entry', ReferenceEntry );

export { ReferenceEntry };