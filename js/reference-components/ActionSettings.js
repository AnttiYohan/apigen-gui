import { WCBase } from '../WCBase.js';

/**
 * This component is used to setup the
 * actions for an event, when a Foreign Key referenced
 * entrity is Updated / Deleted
 * 
 * There are two events:
 * 1) on update
 * 2) on delete
 * ------------
 * for each of these events,
 * is a drop down seletor, from where
 * a predetermined action may be set
 */
class ActionSettings extends WCBase
{
    constructor()
    {
        super();

        // -----------------------------------------------
        // - Setup the ShadowDOM and possible local styles
        // -----------------------------------------------

        const group = '["cascade","remove","none"]';

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='setup__stack'>
            <div class='setup__inline action--update'>
                <p class='setup__prop'>on Update</p>
                <list-selector data-group='${group}'></list-selector>
            </div>
            <div class='setup__inline action--delete'>
                <p class='setup__prop'>on Delete</p>
                <list-selector data-group='${group}'></list-selector>
            </div>
        </div>`);
        
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
            align-items: baseline;
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

        this.mUpdateAction = this.shadowRoot.querySelector( '.action--update list-selector' );
        this.mDeleteAction = this.shadowRoot.querySelector( '.action--delete list-selector' );

    }

    /**
     * Return the title
     * 
     * @return {string}
     */
    get value()
    {
        return {

            on_update: this.mUpdateAction.value,
            on_delete: this.mDeleteAction.value

        };
    }
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<action-settings> connected' );
        this.emit( 'action-settings-connected' );
    }

    disconnectedCallback()
    {
        console.log( '<action-settings> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'action-settings', ActionSettings );

export { ActionSettings };