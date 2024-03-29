import { WCBase } from "./WCBase.js";
import { SchemaStore } from './schema-components/SchemaStore.js';

/**
 * This is the ToolView, container of app menus
 */
class ToolView extends WCBase
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
        <div class='tool'>
            <schema-store>Schemas</schema-store>
        </div>`
        );

        this.setupStyle(
        `.tool {
            display: flex;
            flex-direction: column;
            max-width: 250px;
            min-width: 200px;
            min-height: 100vh;
            overflow-x: hidden;
            background-color: #777;    
        }
        `);
    }    
}

window.customElements.define( 'tool-view', ToolView );

export { ToolView };