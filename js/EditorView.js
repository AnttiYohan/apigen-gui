import { WCBase } from "./WCBase.js";
import { deleteChildren } from './util/elemfactory.js';

/**
 * This is the ToolView, container of app menus
 */
class EditorView extends WCBase
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
        <div class='editor'>
            <header class='editor__header'>
                <h2 class='editor__title'></h2>
            </header>
            <div class='editor__slot'></div>
        </div>`
        );

        this.setupStyle(
        `.editor {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100vh;
            overflow-x: hidden;
            background-color: #224;    
        }
        .editor__header {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 48px;
        }
        .editor__title {
            color: #fff;
            font-size: 18px;
            font-weight: 450;
        }
        `);

        this.mEditorSlot = this.shadowRoot.querySelector( '.editor__slot' );
    }

    attachTableView( props )
    {
        deleteChildren( this.mEditorSlot );

        // - valitade props

        // - create tableview

        // - attach to editor slot
    }
}

window.customElements.define( 'editor-view', EditorView );

export { EditorView };