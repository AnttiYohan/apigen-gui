import { WCBase } from '../WCBase.js';
import { ToggleSwitch } from '../ToggleSwitch.js';

/**
 * This is an base class for a selector
 * menu item, that has a basic functionality,
 * line on/off, and an optional link to detailed
 * popup menu.
 * An concrete Setup class should be alwais created
 * 
 */
class SetupBase extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mTitle = null;
        
        if ( 'title' in options )
        {
            this.mTitle = options.title;
        }

        if ( ! this.mTitle )
        {
            this.mTitle = this.dataset.title ? this.dateset.title : 'unset';
        }

        /**
         * Setup the minimun height
         */
        let min_height = 32;

        if ( 
            'min_height' in options && 
            typeof options.min_height === 'number' && 
            options.min_height >= 32
        )
        {
            min_height = options.min_height;
        }
        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='setup'>
            <p class='setup__title'>${this.mTitle}</p>
            ${'template' in options ? options.template : ''}
            <toggle-switch data-hide='true'></toggle-switch>
        </div>`
        );
        
        this.setupStyle(
        `.setup {
            position: relative;
            display: flex;
            align-items: center;
            min-height: ${min_height}px;
            min-width: 195px;
            max-width: 280px;
            justify-content: space-between;
        }
        .setup__title {
            color: #fff;
            min-width: 40px;
            width: 64px;
            text-align: center;
            font-size: 14px;
            font-weight: 350;
        }
        .setup__inline {
            display: inline-flex;
            flex-direction: row;
        }
        .setup__prop {
            display: inline;
            margin: 0 4px;
            color: #fff;
            font-size: 12px;
        }
        .setup__input--number {
            width: 64px;
            padding: 4px;
            height: 20px;
            color: #222;
            background-color: breachedalmond;
            border: 0 solid transparent;
            border-radius: 2px;
            outline: 2px dashed transparent;
            outline-offset: 1px;
            box-shadow:
            inset 0 -6px 8px -4px rgba(64, 0, 32, 0.3),
            0 4px 8px -3px rgba(240, 240, 255, 0.3);
            transition: outline-color 100ms, outline-offset 300ms ease;
        }
        .setup__input--text {
            max-width: 150px;
            min-width: 64px;
            padding: 4px;
            height: 20px;
            color: #222;
            background-color: breachedalmond;
            border: 0 solid transparent;
            border-radius: 2px;
            outline: 2px dashed transparent;
            outline-offset: 1px;
            box-shadow:
            inset 0 -6px 8px -4px rgba(64, 0, 32, 0.3),
            0 4px 8px -3px rgba(240, 240, 255, 0.3);
            transition: outline-color 100ms, outline-offset 300ms ease;
        }
        .setup__input--number:focus {
            outline-color: rgba(255, 128, 128, 0.5);
            outline-offset: 0;
        }
        .setup__input--text:focus {
            outline-color: rgba(255, 128, 128, 0.5);
            outline-offset: 0;
        }
        .setup__stack {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-self: stretch;
            align-items: flex-end;
            margin-right: 4px;
        }
        ${'style' in options ? options.style : ''}`);

        this.mStateInput = this.shadowRoot.querySelector( 'toggle-switch' );

        this.shadowRoot.addEventListener( 'keyup', e => this.handleKeys( e ) );
    }

    handleKeys( e )
    {
        if ( e === 42 )
        {

        }
    }

    /**
     * Return the title
     * 
     * @return {string}
     */
    get title()
    {
        return this.mTitle;
    }
    
    get state()
    {
        return this.mStateInput.value;
    }

    set state( value )
    {
        this.mStateInput.checked = value;
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

}
 
export { SetupBase };