import { WCBase } from './WCBase.js';

/**
 * This is an on/off 2-state switch component
 */
class ToggleSwitch extends WCBase
{
    constructor()
    {
        super();

        const pos  = this.dataset.position === 'r' ? 'row' : 'row-reverse';
        const hide = this.dataset.hide === 'true' ? true : false;

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='toggle'>
            <label class='toggle__label'>
                <input class='toggle__input' type='checkbox'>
                <span class='toggle__slider'></span>
            </label>
            ${hide ? '' : '<p class="toggle__header"><slot></p>'}
        </div>`);
        
        this.setupStyle(
        `.toggle {
            display: flex;
            flex-direction: ${pos};
            position: relative;
            width: fit-content;
        }
        .toggle__header {
            padding: 4px;
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