import { WCBase } from '../WCBase.js';

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
        this.mTitle = this.dataset.title;

        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='setup'>
            <p class='setup__title'>${this.mTitle}</p>
            ${'template' in options ? options.template : ''}
            <div class='setup__toggle'>
                <input class='toggle__input' type='checkbox' id='state'>
                <label class='toggle__label' for='state'></label>
            </div>
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
        .setup__toggle {
            border-width: 0;
            border-bottom: 2px solid transparent;
            transition: border-color 250ms ease;
        }
        .setup__toggle:focus-within {
            border-bottom-color: rgb(255, 180, 220);
        }
        ${'style' in options ? options.style : ''}`);

        this.mStateInput = this.shadowRoot.getElementById( 'state' );

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
        return this.mStateInput.checked;
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