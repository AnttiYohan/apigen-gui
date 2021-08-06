import { SelectorBase } from '../SelectorBase.js';

/**
 * This is a drop down menu for MySQL table field types
 */
class TypeSelector extends SelectorBase
{
    constructor()
    {
        super({ list: [

            'int',
            'bit',
            'blob',
            'char',
            'float',
            'boolean',
            'varchar',
            'datetime',
            'timestamp',
            'mediumtext'

        ]});

    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    /**
     * Call the base class connectedCallback(), in order
     * for the base class to parse the DOM after it is
     * created and properly conneceted
     * 
     * Emit the component's 'connected' event
     * -------
     * @emits type-selector-connected
     */
    connectedCallback()
    {
        super.connectedCallback();
        console.log( '<type-selector> connected' );
        this.emit( 'type-selector-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<type-selector> disconnected' );
    }
}
 
window.customElements.define( 'type-selector', TypeSelector );

export { TypeSelector };
