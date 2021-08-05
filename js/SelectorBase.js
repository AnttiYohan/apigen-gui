import { WCBase } from './WCBase.js';

/**
 * This is a base class for a dropdown selector
 */
class SelectorBase extends WCBase
{
    constructor( options = {} )
    {
        super();

        this.mItemHeight = 24;
        let html         = '';
        let current      = `<p class='selector__selected'></p>`;
        const items      = [];

        /**
         * Check if a list is passed in options, 
         * and that it has some content
         */
        if ( 'list' in options && Array.isArray( options.list ) && options.list.length )
        {
            for ( const item of options.list )
            {
                items.push( item );
            } 
        }
        else 
        {
            const group = this.dataset.group;
    
            /**
             * Try to parse the item group
             */
            if ( group )
            {
                let parsed;
                try 
                {
                    parsed = JSON.parse( group );
                }
                catch ( error )
                {
                    console.log( `SelectorBase group parse error: ${error}` );
                }

                if ( parsed && Array.isArray( parsed ) )
                {
                    for ( const item of parsed )
                    {
                        items.push( item );
                    }
                }
            }
        }

        if ( items.length )
        {
            const selectedIndex = 'selected' in options ? options.selected : 0;
            let   selectedValue = items[ selectedIndex ];
            let   index         = 0;
            
            for ( const item of items )
            {
                const classList = `selector__item${index === selectedIndex ? ' selected' : ''}`;
                html += `<li class='${classList}' data-enum='${item}'>${item}</li>` + '\n';
                index++;
            }

            current = `<p class='selector__selected'>${selectedValue}</p>`;        
        }

        /**
         * Check if a 'template for the selected (current) item'
         * was passed in the options.
         * If it is present, use it in the current section
         */
        if ( 'template_selected' in options )
        {
            current = options.template_selected;
        }

        /**
         * Check if a left-value is present in the options.
         * The left value is used for horizontal positioning
         * in relation to the parent element
         */
        let left = 0;
        if ( 'left' in options && typeof options.left === 'number' )
        {
            left = options.left;
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
            cursor: pointer;
            width: 96px;
            min-height: 32px;
            position: relative;
            outline: none;
            border: 2px solid transparent;
            transition: border-color 300ms ease;
            background-repeat: no-repeat;
            background-position-x: right;
            background-image: url('assets/img/icon_undo.svg');
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
                        const current = this.getSelected();
                        if ( current )
                        {
                            this.mCurrent.textContent = current;
                        }

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

        /*
        this.mSelector.addEventListener( 'focusout', e =>
        {
            // - check focus
            console.log( `SelectorBase focusout, t: ${e.target.classList}`);

            // - has focus within?
            const res = this.shadowRoot.querySelectorAll( ':focus-within' );

            // -
            console.log( `Focus within amt: ${res.length}`);

            if ( res.length === 0 )
            {
                this.mOptions.classList.remove( 'open' );
            }
        });*/

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

    handleClick( e ) 
    {
        e.preventDefault();
        e.stopPropagation();
        console.log( `Option clicked: ${e.target.dataset.enum}` );
        this.mCurrent.textContent = e.target.dataset.enum;
        this.mOptions.classList.remove( 'open' );
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
            if ( elem.classList.contains( 'selected' ) )
            {
                return elem.dataset.enum;
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
            this.mOptionArray[ newIndex ].classList.add( 'selected' );
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
            this.mOptionArray[ newIndex ].classList.add( 'selected' );
            this.mPointer.style.transform = `translate3d(0, ${newIndex*this.mItemHeight}px, 0)`;
        }
    }

    connectedCallback()
    {
        this.mOptionArray = Array.from( this.mOptions.querySelectorAll( '.selector__item' ) );
        for ( const elem of this.mOptionArray )
        {
            elem.addEventListener( 'click', e => this.handleClick( e ) );
        }
        console.log( `SelectorBase::connectedCallback, option array len: ${this.mOptionArray.length}`);
    }
}
 
export { SelectorBase };