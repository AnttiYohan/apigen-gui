import { EntryItem } from './EntryItem.js';
import { WCBase } from './WCBase.js';

/**
 * This is an element that can create,
 * store and manage text entries
 */
class MultiEntry extends WCBase
{
    constructor()
    {
        super();

        let dir = 'column';  
        let wrap = 'no-wrap';

        if ( this.dataset.dir === 'wrap' )
        {
            dir = 'row';
            wrap = 'wrap';
        }
        else
        if ( this.dataset.dir === 'row' )
        {
            dir = 'row';
        }

        const hide = this.dataset.hide === 'true' ? true : false;

        let pos = 'column';

        if ( this.dataset.pos === 'b' ) pos = 'column-reverse';
        if ( this.dataset.pos === 'l' ) pos = 'row';
        if ( this.dataset.pos === 'r' ) pos = 'row-reverse';

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='entry'>
            <div class='entry__inline'>
                <input class='entry__input' type='text'>
                <button class='component__action--create'>
            </div>
            <div class='entry__store'>
            </div>
        </div>`);
        
        this.setupStyle(
        `.entry {
            display: flex;
            flex-direction: ${pos};
            position: relative;
            min-height: 32px;
        }
        .entry__inline {
            display: flex;
            align-items: center;
        }
        .entry__input {
            margin-right: 6px;
            width: 128px;
            height: 20px;
            border: 0 solid transparent;
            border-bottom: 1px solid rgba(0, 0, 40, .25);
            border-radius: 2px;
            background-color: #ddf;
            outline: 1px dashed transparent;
            outline-offset: 3px;
            box-shadow: inset 0 -8px 10px -4px rgba(40, 0, 0, .25);
            transition: outline-offset 200ms ease, outline-color 300ms ease;
        }
        .entry__input:focus {
            outline-color: #ff8080;
            outline-offset: 1px;
        }
        .entry__store {
            display: flex;
            flex-direction: ${dir};
            flex-wrap: ${wrap};
        }`);
           
        let focus          = false;
        const entryInput   = this.shadowRoot.querySelector( '.entry__input' );
        const createButton = this.shadowRoot.querySelector( '.component__action--create' );
        
        createButton.addEventListener( 'focus', e => 
        {
            focus = true;
        });
        createButton.addEventListener( 'click', e => 
        {
            this.createEntry( entryInput.value );
        });

        this.shadowRoot.addEventListener( 'keypress', e => 
        {
            if ( focus && e.keyCode === this.KEY_ENTER )
            {
                this.createEntry( entryInput.value );
            }
        });

        this.mStore = this.shadowRoot.querySelector( '.entry__store' );
    }

    createEntry( value )
    {
        if ( value && typeof value === 'string' && value.length )
        {
            this.mStore.appendChild( new EntryItem( value ) );
        }
    }

    get value()
    {
        const result = [];

        for ( const item of this.mStore.children )
        {
            const value = item.value;

            if ( value && typeof value === 'string' && value.length )
            {
                result.push( value );
            }
        }

        return result.length ? result : null;
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<multi-entry> connected' );
        this.emit( 'multi-entry-connected' );
    }
}
 
window.customElements.define( 'multi-entry', MultiEntry );

export { MultiEntry };