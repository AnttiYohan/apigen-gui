import { WCBase } from '../WCBase.js';

/**
 * This is an singluar entry element
 * used in the SchemaStore
 * Data stored:
 * - schema title
 * - schema id
 *  
 * @emits schema-entry-connected
 */
class SchemaEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mId    = 0;
        this.mTitle = '';

        /**
         * Check for id
         */
        if ( 'id' in options )
        {
            this.mId = options.id;
        }

        if ( 'title' in options )
        {
            this.mTitle = options.title;
        }

        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='entry'>
            <h2 class='entry__title'>${this.mTitle}</h2>
            <button class='component__action--edit'></button>
            <button class='component__action--remove'></button>
        </div>`);
         
    }

    /**
     * Return the image and the text content
     * 
     * @return {object}
     */
    get value()
    {
        return {

            title: this.mTitle,
            id:    this.mId

        }
    }
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( "<schema-entry> connected" );
        this.emit( 'schema-entry-added' );
    }

    disconnectedCallback()
    {
        console.log( '<schema-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'schema-entry', SchemaEntry );

export { SchemaEntry };