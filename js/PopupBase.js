import { WCBase } from './WCBase.js';

/**
 * This is a base class for popup windows
 */
class PopupBase extends WCBase
{
    constructor( options = {} )
    {
        super();

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
        <div class='popup' tabindex='0'>
            ${'template_selected' in options ? options.template_selected : ''}
            <ul class='popup__display'>
                ${'template' in options ? options.template : ''}
            </ul>
        </div>`);
        
        this.setupStyle(
        `.popup {
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
        .popup:focus {
            border-color: rgba(255, 255, 255, .67);
        }
        .popup__selected {
            color: #fff;
            padding: 4px;
        }
        .popup__display {
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
        .popup__display.open {
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
        ${'style' in options ? options.style : ''}`);

        /**
         * The selected elem
         */
        this.mPopup     = this.shadowRoot.querySelector( '.popup' );
        this.mDisplay   = this.shadowRoot.querySelector( '.popup__display' );
        this.mPopup.addEventListener( 'click', e => 
        {
            this.mDisplay.classList.toggle( 'open' );    
        });

        let focus = false;
        
        const handleKeyPress = e => {

            if ( focus )
            {
                if ( e.keyCode === this.KEY_ENTER )
                {
                    if ( ! this.isOpen() )
                    {
                        this.open();
                    }
                }
            }
        };

        this.mPopup.addEventListener( 'focus', e => 
        {
            focus = true;
        });
        this.mPopup.addEventListener( 'blur', e => 
        {
            focus = false;
        });

        this.shadowRoot.addEventListener( 'keyup', e => handleKeyPress( e ) );
    }

    handleClick( e ) 
    {
        e.preventDefault();
        e.stopPropagation();
        this.mDisplay.classList.remove( 'open' );
    }

    isOpen()
    {
        return this.mDisplay.classList.contains( 'open' );
    }

    open()
    {
        this.mDisplay.classList.add( 'open' );
    }
}
 
export { PopupBase };