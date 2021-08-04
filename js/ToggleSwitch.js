import { WCBase } from './WCBase.js';

/**
 * This is an on/off 2-state switch component
 */
class ToggleSwitch extends WCBase
{
    constructor()
    {
        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='toggle'>
            <label class='toggle__label'>
                <input class='toggle__input' type='checkbox'>
                <span class='toggle__slider'></span>
            </label>
            <p class='toggle__header'><slot></p>
        </div>`
        );
        
        this.setupStyle(
        `.toggle {
            position: relative;
        }
        .toggle__header {
            position: absolute;
            top: -6px;
            left: 4px;
            font-size: 10px;
            color: #fff;
        }`);
                
        this.mInput = this.shadowRoot.querySelector( '.toggle__input' );
    }


    get value()
    {
        return this.mInput.value;
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<toggle-switch> connected' );
        this.emit( 'toggle-switch-connected' );
    }
}
 
window.customElements.define( 'toggle-switch', ToggleSwitch );

export { ToggleSwitch };