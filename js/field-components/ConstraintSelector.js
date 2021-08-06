import { AutoincSetup } from './AutoincSetup.js';
import { NotnullSetup } from './NotnullSetup.js';
import { DefaultSetup } from './DefaultSetup.js';
import { UniqueSetup } from './UniqueSetup.js';
import { PopupBase } from '../PopupBase.js';

/**
 * This is a popup window that manages the
 * field ( column ) constraint settings
 */
class ConstraintSelector extends PopupBase
{
    constructor()
    {
        const template =
       `<autoinc-setup></autoinc-setup>
        <notnull-setup></notnull-setup>
        <unique-setup></unique-setup>
        <default-setup></default-setup>`;

        const template_selected =
        `<constraint-icons></constraint-icons>`;

        super({ template, template_selected, left: -100 });
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    /**
     * Emit component's 'connected' event
     * Set a listener for 'popup-open' events
     * 
     * @emits   constraint-selector-connected
     * @listens popup-open
     */
    connectedCallback()
    {
        console.log( '<constraint-selector> connected' );
        this.emit( 'constraint-selector-connected' );
        
        /**
         * Listen to popup open-close broadcast channel
         */
        this.listen( 'popup-open', e => this.popupReceiver( e ) );
    }

    disconnectedCallback()
    {
        console.log( '<constraint-selector> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'constraint-selector', ConstraintSelector );

export { ConstraintSelector };
