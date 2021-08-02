import { WCBase } from "./WCBase.js";

/**
 * This is the MainView, applications main layout
 */
class MainView extends WCBase
{
    constructor()
    {
        super();
        
        // -----------------------------------------------
        // - Setup ShadowDOM: set stylesheet and content
        // - from template 
        // -----------------------------------------------

        this.attachShadow({mode : "open"});
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='popup-connector'></div>
        <div class='main'>
            <tool-view></tool-view>
        </div>`
        );    
    }    
}

window.customElements.define( 'main-view', MainView );

export { MainView };