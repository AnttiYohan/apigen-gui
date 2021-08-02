/**
 * WebComponent base class
 */
class WCBase extends HTMLElement
{
    constructor()
    {
        super();
        this.KEY_ENTER = 13;
        this.KEY_UP    = 38;
        this.KEY_DOWN  = 40;
    }

    /**
     * Set the component style
     * 
     * @param {string} css 
     */
    setupStyle( css )
    {
        const style = document.createElement( 'style' );
        style.textContent = css;
        this.shadowRoot.appendChild( style );
    }

    /**
     * Create the component shadow DOM from HTML
     * 
     * @param {string} content 
     */
    setupTemplate( content )
    {
        const template = document.createElement( 'template' );
        template.innerHTML = content;
        this.shadowRoot.appendChild( template.content.cloneNode( true ) );
    }

    /**
     * Broadcast a custom event with an optional payload
     * 
     * @param {string} type,    the event type
     * @param {any}    payload, the event detail 
     */
    emit( type, payload = undefined )
    {
        const options = { bubbles: true, composed: true };
        if ( payload ) options[ 'detail' ] = msg;
        this.shadowRoot.dispatchEvent( new CustomEvent( type, options ) );
    }

    /**
     * Executes a callback on an event
     * 
     * @param {string}   type,      the event type 
     * @param {function} callback 
     */
    listen( type, callback )
    {
        if ( typeof type === 'string' && typeof callback === 'function' )
        {
            this.shadowRoot.addEventListener( type, e => callback( e ) );
        }
    }
} 

// ---------------------------------------
// - HTTP Request constants
// ---------------------------------------

const API_URL         = 'http://localhost:8080';
const LOGIN_URL       = `${API_URL}/perform_login`;
const LOGOUT_URL      = `${API_URL}/logout`;
const AUTH_STATUS_URL = `${API_URL}/auth-status`;
 
export {

    WCBase, 
    API_URL,
    LOGIN_URL,
    LOGOUT_URL,
    AUTH_STATUS_URL,

};