import { SelectorBase } from './SelectorBase.js';

/**
 * This is a selector with a list of strings
 */
class ListSelector extends SelectorBase
{
    constructor()
    {
        super();        
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        super.connectedCallback();
        console.log( '<list-selector> connected' );
        this.emit( 'list-selector-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<list-selector> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'list-selector', ListSelector );

export { ListSelector };
