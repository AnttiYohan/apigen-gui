import { SetupBase } from "./SetupBase";

/**
 * This is an concrete Setup Component for Default
 * constraint state management
 */
class DefaultSetup extends SetupBase
{
    constructor( options = {} )
    {
        const template =
       `<input class='setup__input--text' type='text'>`;

        super({
            title: 'default',
            template,
            min_height: 32
        });

        this.mDefaultInput   = this.shadowRoot.querySelector( '.setup__input--text' );
    }

    /**
     * Return the step value
     * 
     * @return {string}
     */
    get default()
    {
        return this.mDefaultInput.value;
    }

    /**
     * Set the step value
     */
    set default( value )
    {
        if ( typeof value === 'string' || typeof value === 'number' )
        {
            this.mDefaultInput.value = value;
        }
    }

    /**
     * Retrieve total state
     */
    get value()
    {
        return {

            title:   this.title,
            state:   this.state,
            default: this.default,

        }
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<default-setup> connected' );
        this.emit( 'default-setup-connected' );
    }
}
 
window.customElements.define( 'default-setup', DefaultSetup );

export { DefaultSetup };