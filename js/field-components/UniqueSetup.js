import { SetupBase } from "./SetupBase";

/**
 * This is an concrete Setup Component for Unique
 * constraint state management
 */
class UniqueSetup extends SetupBase
{
    constructor( options = {} )
    {
        super({ title: 'unique' });
    }

    get value()
    {
        return {

            title: this.title,
            state: this.state

        }
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<unique-setup> connected' );
        this.emit( 'unique-setup-connected' );
    }
}
 
window.customElements.define( 'unique-setup', UniqueSetup );

export { UniqueSetup };