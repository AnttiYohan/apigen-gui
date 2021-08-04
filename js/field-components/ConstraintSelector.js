import { SelectorBase } from '../SelectorBase.js';
import { AutoincSetup } from './AutoincSetup.js';

/**
 * This is a base class for a dropdown selector
 */
class ConstraintSelector extends SelectorBase
{
    constructor()
    {
        const template =
       `<autoinc-setup></autoinc-setup>
        <notnull-setup></notnull-setup>
        <unique-setup></unique-setup>
        <check-setup></check-setup>
        <index-setup></index-setup>`;

        const template_selected =
        `<constraint-icons></constraint-icons>`;

        super({ template, template_selected });
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<constraint-selector> connected' );
        this.emit( 'constraint-selector-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<constraint-selector> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'constraint-selector', ConstraintSelector );

export { ConstraintSelector };
