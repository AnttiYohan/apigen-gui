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
            min-height: 32px;
        }
        .setup__title {
            color: #fff;
            min-width: 98px;
            text-align: center;
            font-size: 12px;
            font-stretch: 70%;
            font-weight: 350;
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