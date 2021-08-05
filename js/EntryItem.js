import { WCBase } from './WCBase.js';

/**
 * This is a simple element with a string value
 * and a remove button
 */
class EntryItem extends WCBase
{
    constructor( value )
    {
        super();

        this.mValue = value;

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='item'>
            <p class='item__value'>${value}</p>
            <button class='button--remove-small'></button>
        </div>`);
        
        this.setupStyle(
        `:host { display: inline; }
        .item {
            display: inline-flex;
            border-radius: 20px;
            border: 2px solid rgba(255, 240, 245, 0.75);
            background-color: #446;
            padding: 4px;
            margin: 4px;
        }
        .item__value {
            color: #fff;
            margin-left: 3px;
            transform: translate3d(0, -.25px, 0);
        }
        .button--remove-small {
            cursor: pointer;
            width: 18px;
            height: 18px;
            border: none;
            margin-left: 3px;
            background-color: transparent;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url('assets/img/icon-delete-duo.svg');
        }`);
           
        const removeButton = this.shadowRoot.querySelector( '.button--remove-small' );        
        removeButton.addEventListener( 'click', e => this.remove() );
    }

    get value()
    {
        return this.mValue;
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<entry-item> connected' );
    }
}
 
window.customElements.define( 'entry-item', EntryItem );

export { EntryItem };