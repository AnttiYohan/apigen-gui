import { SetupBase } from "./SetupBase";

/**
 * This is an concrete Setup Component for Notnull
 * constraint state management
 */
class NotnullSetup extends SetupBase
{
    constructor( options = {} )
    {
        super({ title: 'notnull' });
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
        console.log( '<notnull-setup> connected' );
        this.emit( 'notnull-setup-connected' );
    }
}
 
window.customElements.define( 'notnull-setup', NotnullSetup );

export { NotnullSetup };