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
       `<div class='setup__stack'>
            <div class='setup__inline'>
                <p class='setup__prop'>step</p>
                <input class='setup__input--number autoinc__step' type='number'>
            </div>
            <div class='setup__inline'>
                <p class='setup__prop'>offset</p>
                <input class='setup__input--number autoinc__offset' type='number'>
            </div>
        </div>`;

        super({
            title: 'autoinc',
            template,
            min_height: 48
        });

        this.mStepInput   = this.shadowRoot.querySelector( '.autoinc__step' );
        this.mOffsetInput = this.shadowRoot.querySelector( '.autoinc__offset' );
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


    /**
     * Return the offset value
     * 
     * @return {string}
     */
    get offset()
    {
        return this.mOffsetInput.value;
    }


    /**
     * Set the step value
     */
    set step( value )
    {
        if ( typeof value === 'number' ) this.mStepInput.value = value;
    }

    /**
     * Set the step value
     */
    set offset( value )
    {
        if ( typeof value === 'number' ) this.mOffsetInput.value = value;
    }

    /**
     * Retrieve total state
     */
    get value()
    {
        return {

            title:  this.title,
            state:  this.state,
            step:   this.step,
            offset: this.offset

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