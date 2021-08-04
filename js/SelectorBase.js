import { WCBase } from './WCBase.js';

/**
 * This is a base class for a dropdown selector
 */
class SelectorBase extends WCBase
{
    constructor( options )
    {
        super();

        let html   = '';
        this.mMode = '';
        this.mItemHeight = 24;
        let selectedValue = '';
        if ( 'list' in options )
        {
            let index = 0;
            const selectedIndex = 'selected' in options ? options.selected : 0;
            selectedValue = options.list[ selectedIndex ];

            for ( const item of options.list )
            {
                const classList = `selector__item${index === selectedIndex ? ' selected' : ''}`;
                html += `<li class='${classList}' data-enum='${item}'>${item}</li>` + '\n';
                index++;
            }

            this.mMode = 'list';
        }
        else
        if ( 'template' in options )
        {
            html = options.template;
            this.mMode = 'template';
        }

        let current = `<p class='selector__selected'>${selectedValue}</p>`;

        if ( 'template_selected' in options )
        {
            current = options.template_selected;
        }
        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='selector' tabindex='0'>
            ${current}
            <ul class='selector__list'>
                ${html}
                <div class='selector__pointer'></div>
            </ul>
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
        .selector__selected {
            color: #fff;
            padding: 4px;
        }
        .selector__list {
            position: absolute;
            display: none;
            z-index: 1;
            left: 0;
            top: -32px;
            width: 128px;
            background-color: #643;
        }
        .selector__list.open {
            display: block;
        }
        .selector__item {
            cursor: pointer;
            height: ${this.mItemHeight}px;
            transition: background-color 150ms ease, color 150ms ease;
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
        }
        ${'style' in options ? options.style : ''}`);

        /**
         * The selected elem
         */
        this.mSelector  = this.shadowRoot.querySelector( '.selector' );
        this.mCurrent   = this.shadowRoot.querySelector( '.selector__selected' );
        this.mOptions   = this.shadowRoot.querySelector( '.selector__list' );
        this.mPointer   = this.shadowRoot.querySelector( '.selector__pointer' );
        this.mOptionArray = Array.from( this.mOptions.querySelectorAll( '.selector__item' ) );
        
        if ( this.mMode === 'list' )
        {
            const handleClick = e => {

                e.preventDefault();
                e.stopPropagation();
                console.log( `Option clicked: ${e.target.dataset.enum}` );
                this.mCurrent.textContent = e.target.dataset.enum;
                this.mOptions.classList.remove( 'open' );

            };
            for ( const elem of this.mOptionArray )
            {
                elem.addEventListener( 'click', e => handleClick( e ) );
            }
        }

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

        /**
         * Focus / blur types/constraints
         */
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
        for ( const elem of this.mOptionArray )
        {
            if ( this.mMode === 'template' )
            {
                if ( elem.selected )
                {
                    return elem.value;
                }
            }
            else 
            {
                if ( elem.classList.contains( 'selected' ) )
                {
                    return elem.dataset.enum;
                }
            }

        }

        return null;
    }

    down()
    {
        let index     = 0;
        let found     = false;
        const length  = this.mOptionArray.length - 1;
        
        for ( const elem of this.mOptionArray )
        {
            if ( this.mMode === 'template' )
            {
                if ( elem.selected )
                {
                    found = true;
                    elem.selected = false;
                    break;
                }
            }
            else
            if ( elem.classList.contains( 'selected' ) )
            {
                found = true;
                elem.classList.remove( 'selected' );
                break;
            }

            index++;
        }


        if ( found )
        {
            const newIndex = index < length ? index + 1 : 0;

            if ( this.mMode === 'template' )
            {
                this.mOptionArray[ newIndex ].selected = true;
            }
            else this.mOptionArray[ newIndex ].classList.add( 'selected' );

            this.mPointer.style.transform = `translate3d(0, ${newIndex*this.mItemHeight}px, 0)`;
        }
    }

    up()
    {
        let index     = 0;
        let found     = false;
        const length  = this.mOptionArray.length - 1;
    
        for ( const elem of this.mOptionArray )
        {
            if ( this.mMode === 'template' )
            {
                if ( elem.selected )
                {
                    found = true;
                    elem.selected = false;
                    break;
                }
            }
            else
            if ( elem.classList.contains( 'selected' ) )
            {
                found = true;
                elem.classList.remove( 'selected' );
                break;
            }

            index++;
        }


        if ( found )
        {
            const newIndex = index > 0 ? index - 1 : length;
            if ( this.mMode === 'template' )
            {
                this.mOptionArray[ newIndex ].selected = true;
            }
            else this.mOptionArray[ newIndex ].classList.add( 'selected' );

            this.mPointer.style.transform = `translate3d(0, ${newIndex*this.mItemHeight}px, 0)`;
        }
    }
}
 
export { SelectorBase };