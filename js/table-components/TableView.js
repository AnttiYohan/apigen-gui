import { WCBase } from "../WCBase.js";
import { FieldStore } from "../field-components/FieldStore.js";
import { IndexStore } from "../index-components/IndexStore.js";
import { ReferenceStore } from "../reference-components/ReferenceStore.js";
import { deleteChildren } from '../util/elemfactory.js';

/**
 * This is the TableView, the view where a db schema
 * table may me created and modified
 * 
 * -------
 * Features:
 * 
 * -------
 * Usage:
 * 
 * -------
 * properties:
 * - field store 
 * - reference store 
 * - index store
 */
class TableView extends WCBase
{
    constructor( options = {} )
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
        <div class='table'>
            <header class='table__header'>
                <h2 class='table__name'></h2>
            </header>
            <field-store>Fields</field-store>
            <reference-store>References</reference-store>
            <index-store>Indices</index-store>
        </div>`
        );

        this.setupStyle(
        `
        :host { width: 100%; }
        .table {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
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
        }`);

        this.mFieldStore     = this.shadowRoot.querySelector( 'field-store' );
        this.mReferenceStore = this.shadowRoot.querySelector( 'reference-store' );
        this.mIndexStore     = this.shadowRoot.querySelector( 'index-store' );

        /**
         * Check table integrity
         * 
         * integrity-check button
         */

        /**
         * Save table button
         */
    }

    connectedCallback()
    {
        console.log( '<table-view> connected' );
        this.emit( 'table-view-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<table-view> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}

window.customElements.define( 'table-view', TableView );

export { TableView };