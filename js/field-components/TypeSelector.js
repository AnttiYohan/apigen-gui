import { SelectorBase } from '../SelectorBase.js';

/**
 * This is a base class for a dropdown selector
 */
class TypeSelector extends SelectorBase
{
    constructor()
    {
        const list = [

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

        ];

        super({ list });
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<type-selector> connected' );
        this.emit( 'type-selector-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<type-selector> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'type-selector', TypeSelector );

export { TypeSelector };
