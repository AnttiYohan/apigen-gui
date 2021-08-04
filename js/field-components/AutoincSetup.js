import { SetupBase } from "./SetupBase";

/**
 * This is an concrete Setup Component for Autoinc
 * constraint state management
 */
class AutoincSetup extends SetupBase
{
    constructor( options = {} )
    {
        const template =
        `<input class='autoinc__step' type='number'>`;

        const style = 
        `.autoinc__step {
            width: 40px;
            padding: 4px;
            min-height: 32px;
            outline: none;
            border-bottom: 2px solid transparent;
            box-shadow:
            inset 0 -6px 8px -4px rgba(64, 0, 32, 0.3);
            transition: border-botton-color 200ms ease;
        }
        .autoinc__step:focus {
            border-bottom-color: rgba(255, 250, 240, .67);
        }`;

        super({
            title: 'autoinc',
            template,
            style
        });


        this.mStepInput = this.shadowRoot.querySelector( '.autoinc__step' );
    }

    /**
     * Return the step value
     * 
     * @return {string}
     */
    get step()
    {
        return this.mStepInput.value;
    }

    set step( value )
    {
        this.mStepInput.value = value;
    }

    get value()
    {
        return {

            title: this.title,
            state: this.state,
            step:  this.step

        }
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<autoinc-setup> connected' );
        this.emit( 'autoinc-setup-connected' );
    }
}
 
window.customElements.define( 'autoinc-setup', AutoincSetup );

export { AutoincSetup };