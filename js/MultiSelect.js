import { WCBase } from './WCBase.js';

/**
 * This is a base class for a multi dropdown selector
 */
class MultiSelect extends WCBase
{
    constructor()
    {
        super();

        this.mItemHeight = 24;

        const h = this.dataset.item_height;
        if ( h && ! isNaN( h ) )
        {
            this.mItemHeight = h;
        }

        this.mItems = [];
        let html = `<ul class='selector__list'>`;
        let selIndex = 0;

        const group = this.dataset.group;
        
        if ( group )
        {
            let values;

            try 
            {
                values = JSON.parse( group );
            }
            catch ( error )
            {
                console.log( `MultiSelect 'group' parse error: ${error}` );
            }

            if ( values && Array.isArray( values ))
            {
                let index = 0;
                for ( const value of values )
                {
                    this.mItems.push( value );
                    let classList = 'selector__item';

                    if ( index === selIndex )
                    {
                        classList += ' index';
                    }

                    html += `<li class='${classList}' data-value='${value}'>${value}</li>`;
                    index++;
                }
            }
        }

        html += '</ul>';

        let left = 0;

        if ( this.hasOwnProperty( 'data-left') )
        {
            if ( ! isNaN( this.dataset.left ) )
            {
                left = Number( this.dataset.left );
            }
        }
        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='selector' tabindex='0'>
            <ul class='selector__current'>
            </ul>
            ${html}
        </div>`);
        
        this.setupStyle(
        `.selector {
            width: 96px;
            min-height: 32px;
            position: relative;
            outline: none;
            border: 2px solid transparent;
            transition: border-color 300ms ease;
        }
        .selector:focus {
            border-color: rgba(255, 255, 255, .67);
        }
        .selector__current {
            display: flex;
            flex-direction: column;
        }
        .selector__selected {
            color: #fff;
            padding: 4px;
        }
        .selector__list {
            position: absolute;
            padding: 8px 4px 16px 4px;
            display: none;
            z-index: 1;
            left: ${left}px;
            top: -32px;
            background-color: #446;
            border-radius: 24px;
            border: 6px solid #aac;
        }
        .selector__list.open {
            display: block;
        }
        .selector__item {
            cursor: pointer;
            height: ${this.mItemHeight}px;
            border-radius: 4px;
            border: 2px solid transparent;
            transition: background-color 150ms ease, color 150ms ease;
        }
        .selector__item.index {
            border-color: rgba(255, 128, 128, 0.5);
        }
        .selector__item.selected {
            background-color: rgb(255,240,240);
            color: #222;
            box-shadow: 0 8px 12px -4px rgba(255, 255, 255, .34);
        }
        .selector__pointer {
            position: absolute;
            top: 0;
            left: -32px;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url('assets/img/icon_plus');
            transform: translate3d(0, 0, 0);
            transition: transform 200ms;
            z-index: 1;
        }`);

        /**
         * The selected elem
         */
        this.mSelector  = this.shadowRoot.querySelector( '.selector' );
        this.mCurrent   = this.shadowRoot.querySelector( '.selector__selected' );
        this.mOptions   = this.shadowRoot.querySelector( '.selector__list' );
        this.mPointer   = this.shadowRoot.querySelector( '.selector__pointer' );
        this.mOptionArray = [];
    
        this.mSelector.addEventListener( 'click', e => 
        {
            this.mOptions.classList.toggle( 'open' );    
        });

        let focus = false;
        
        const handleKeyPress = e => {

            if ( focus )
            {
                if ( e.keyCode === this.KEY_ENTER )
                {
                    if ( this.isOpen() )
                    {
                        this.mOptions.classList.remove( 'open' );
                    }
                    else this.open();
                }
                else
                if ( e.keyCode === this.KEY_SPACE )
                {
                    if ( this.isOpen() )
                    {
                        this.select();
                    }
                }
                else
                if ( e.keyCode === this.KEY_DOWN )
                {
                    if ( this.isOpen() )
                    {
                        this.down();
                    }
                }
                else
                if ( e.keyCode === this.KEY_UP )
                {
                    if ( this.isOpen() )
                    {
                        this.up();
                    }
                }
            }
        };

        
        this.mSelector.addEventListener( 'focus', e => 
        {
            focus = true;
        });

        this.mSelector.addEventListener( 'blur', e => 
        {
            this.mOptions.classList.remove( 'open' );
            focus = false;
        });

        this.shadowRoot.addEventListener( 'keyup', e => handleKeyPress( e ) );
    }

    isOpen()
    {
        return this.mOptions.classList.contains( 'open' );
    }

    open()
    {
        this.mOptions.classList.add( 'open' );
    }

    getSelected()
    {
        const result = [];

        for ( const elem of this.mOptionArray )
        {
            if ( elem.classList.contains( 'selected' ) )
            {
                result.push( elem.dataset.enum );
            }
        }

        return result.length ? result : null;
    }

    select()
    {    
        for ( const elem of this.mOptionArray )
        {
            if ( elem.classList.contains( 'index' ) )
            {
                elem.classList.toggle( 'selected' );
                break;
            }
        }    
    }

    down()
    {
        let index     = 0;
        let found     = false;
        const length  = this.mOptionArray.length - 1;
        
        for ( const elem of this.mOptionArray )
        {
            if ( elem.classList.contains( 'index' ) )
            {
                found = true;
                elem.classList.remove( 'index' );
                break;
            }

            index++;
        }


        if ( found )
        {
            const newIndex = index < length ? index + 1 : 0;
            this.mOptionArray[ newIndex ].classList.add( 'index' );
        }
    }

    up()
    {
        let index     = 0;
        let found     = false;
        const length  = this.mOptionArray.length - 1;
    
        for ( const elem of this.mOptionArray )
        {
            if ( elem.classList.contains( 'index' ) )
            {
                found = true;
                elem.classList.remove( 'index' );
                break;
            }

            index++;
        }

        if ( found )
        {
            const newIndex = index > 0 ? index - 1 : length;
            this.mOptionArray[ newIndex ].classList.add( 'selected' );
        }
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<multi-select> connected' );
        this.emit( 'multi-select-connected' );

        this.mOptionArray = Array.from( this.mOptions.children );
    }

}
 
window.customElements.define( 'multi-select', MultiSelect );

export { MultiSelect };