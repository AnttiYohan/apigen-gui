import { WCBase } from '../WCBase.js';

/**
 * This is an singluar entry element
 * used in the TableStore
 * Data stored:
 * - table name
 * - table id
 * - table fields
 *  
 * @emits table-entry-connected
 */
class TableEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mId     = 0;
        this.mName   = '';
        this.mFields = [];

        /**
         * Check for id
         */
        if ( 'id' in options )
        {
            this.mId = options.id;
        }

        if ( 'name' in options )
        {
            this.mName = options.name;
        }

        if ( 'fields' in options )
        {
            for ( const field of options.fields )
            {
                this.mFields.push( field );
            }
        }

        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='entry'>
            <h2 class='entry__title'>${this.mName}</h2>
            <button class='component__action--edit'></button>
        </div>`
        );
        
        /**
         * Setup a click listener in the entry,
         * in order to open/close the
         * table store
         */
        const editButton = this.shadowRoot.querySelector( '.component__action--edit' );
    
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
            name:   this.mName,
            fields: this.mFields

        }
    }
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( "<table-entry> connected" );
        this.emit( 'table-entry-added' );
    }

    disconnectedCallback()
    {
        console.log( '<table-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'table-entry', TableEntry );

export { TableEntry };