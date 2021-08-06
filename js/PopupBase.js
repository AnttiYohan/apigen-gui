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
            <ul class='popup__display' tabindex='0'>
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
        .popup__display:focus-within {
            outline: 3px solid rgba(120, 100, 255, 0.5);
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
            console.log( `mPopup CLICK, target: ${e.target.className}` );

            // - Open, but do not close
            if ( ! this.mDisplay.classList.contains( 'open' ) )
            {
                this.mDisplay.classList.add( 'open' );
                this.mDisplay.focus(); 
            } 
        });

    /*    this.mDisplay.addEventListener( 'click', e => 
        {
            const active = this.shadowRoot.activeElement;
            console.log( '------');
            console.log( '' );
            console.log( `DISPLAY Click: ${e.target.localName}` );
            console.log( '-' );
            if ( active )
                console.log( `Local Active element: ${active.localName}` );
            else
                console.log( `Last active: ${this.mActiveElement ? this.mActiveElement.localName : 'null'}, document active: ${document.activeElement.localName}`);
            //this.mDisplay.classList.remove( 'open' );
        }, true);*/

        this.mActiveElement = null;

        /**
         * Setup a 'focusout' listener into the popup display
         * When the focus is not within, the
         * display will be closed
         */
        this.mDisplay.addEventListener( 'focusout', e => 
        {
            const active = this.shadowRoot.activeElement;
            if ( active ) this.mActiveElement = active;


            const focusWithin = this.mPopup.querySelector( '.popup__display:focus-within' );

            if ( ! focusWithin )
            {
                console.log( 'Display focus NOT found' );

                if ( active )
                {
                    console.log( `Active found, ${active.localName}` );
                }
                else 
                {
                    this.close();
                }
            }
        });

        let focus = false;
        
        /**
         * Handles the key events in this shadowRoot context
         * 
         * @param {Event} e 
         */
        const handleKeyPress = e => {

            /**
             * Enter is pressed,
             * the intended outcomes:
             * 1. Open the popup display if not open
             * 2. Close the popup display if open,
             * and the active element is the display
             */
            if ( e.keyCode === this.KEY_ENTER )
            {
                if ( this.isOpen() )
                {
                    if ( this.mDisplay.isSameNode( this.shadowRoot.activeElement ) )
                    {
                        this.close();
                    }
                }
                else 
                if ( focus )
                {
                    this.open();
                }
            }
            /**
             * ESC is pressed,
             * the intended outcomes:
             * 1. Open the popup display if not open
             * 2. Close the popup display if open,
             * and the active element is the display
             */
            else
            if ( e.keyCode === this.KEY_ESC && this.isOpen() )
            {
                this.close();
            }
    
        };

        /**
         * Listen to the popup main button 'focus' events,
         * handle by setting the 'focus' flag,
         * and by opening the popup display, if not open yet
         */
        this.mPopup.addEventListener( 'focus', e => 
        {
            console.log( `Parent FOCUS, latest active: ${this.mActiveElement ? this.mActiveElement.localName: 'null'}` );
            focus = true;
            // - Close if display open
            if ( this.isOpen() )
            {
                this.close();
            }
        });

        /**
         * Listen to the popup main button 'blur' events,
         * unset the 'focus' flag
         */
        this.mPopup.addEventListener( 'blur', e => 
        {
            focus = false;
        });

        /**
         * Set the shadowRoot to listen for 'keyup' events
         */
        this.shadowRoot.addEventListener( 'keyup', e => handleKeyPress( e ) );
    }

    /**
     * Returns the state of the popup display
     * 
     * @return {boolean} 
     */
    isOpen()
    {
        return this.mDisplay.classList.contains( 'open' );
    }

    /**
     * Opens the popup and focuses into
     * the popup display 
     * 
     * @emits popup-open
     */
    open()
    {
        this.mDisplay.classList.add( 'open' );
        this.mDisplay.focus();
        this.emit( 'popup-open' );
    }

    /**
     * Closes the popup and focuses into the
     * popup selector button
     * 
     * @emits popup-close
     */
    close()
    {
        this.mDisplay.classList.remove( 'open' );
        if ( this.shadowRoot.activeElement && this.shadowRoot.activeElement.isSameNode( this.mDisplay ) )
        {
            this.mDisplay.blur();
        }
        this.mPopup.focus();
        this.emit( 'popup-close' );
    }

    /**
     * Handles an event, which is set in the concrete class
     * 
     * @param {Event} e 
     */
    popupReceiver( e )
    {
        console.log( `PopupBase received broadcast from ${e.target}` );

        if ( e.detail )
        {
            console.table( detail );
        }
    }
}
 
export { PopupBase };