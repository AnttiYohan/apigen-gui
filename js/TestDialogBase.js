import { WCBase } from './WCBase.js';

/**
 * This is a base class for embedded
 * test user interfaces.
 * 
 * The dialog dimensions are intended to
 * be about 
 * 400..600px in width, and
 * 250..400px in height.
 * 
 * The dialog has by default a thick, white, rounded
 * border, to highlight it.
 * 
 * ---------------------
 * The content (minimum):
 * - header, the name of the test
 * - run button, with call to action to execute test
 * - optionally short description
 * - test progress indicator
 * - test completion indicator
 * - test result display ( text, icons, colors etc. )
 * 
 */
class TestDialogBase extends WCBase
{
    constructor( options )
    {
        super();

        const width = 600;
        const height = 400;

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='test'>
            <header class='test__header'>
                <div class='test__signal signal--left'>
                </div>
                <h2 class='test__title'>${options.title}</h2>
                <div class='test__signal signal--right'>
                </div>
            </header>
            <div class='test__body'>
                <div class='test__body--left'>
                    <div class='test__response'>
                        <div class='response__action-area'>
                            <span class='response__action action--copy-to-clipboard'></span>
                        </div>
                        <p class='response__message'>
                        </p>
                        <div class='response__indicator-area'>
                            <div class='response__indicator indicator--pass'></div>
                            <div class='response__indicator indicator--fail'></div>
                        </div>
                    </div>
                    <div class='test__controls'>
                        <div class='control--last-pass-state'>
                        </div>
                    </div>
                </div>
                <div class='test__body--request'>
                    <div class='request__button-area'>
                        <button class='request__button button--reset'></button>
                        <button class='request__button button--run'></button>
                    </div>
                    <div class='request__option-area'>
                        <div class='request__progress'></div>
                        <div class='request__option'></div>
                    </div>
                </div>
            </div>
        </div>`);
        
        this.setupStyle(
        `
        .test {
            display: flex;
            flex-direction: column;
            width: ${width}px;
            height: ${height}px;
            border-radius: ${height / 2}px;
            border: 6px solid rgba(255, 240, 245, 0.75);
            background-color: #446;
            padding: 4px;
            margin: 4px;
        }
        .test__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-basis: 32px;
            flex-grow: 0;
        }
        .test__title {
            color: #fff;
            font-size: 18px;
        }
        .test__signal {
            width: 64px;
            background-repeat: no-repeat;
            background-size: 12px;
            background-color: transparent;
            background-position-y: center;
        }
        .signal--left {
            background-position-x: right;
            background-image: url('assets/img/icon_plus.svg');
        }
        .signal--right {
            background-position-x: left;
            background-image: url('assets/img/icon_plus.svg');
        }
        .test__body {
            flex-basis: 100%;
            display: flex;
        }
        .test__body--left {
            display: flex;
            flex-direction: column;
        }
        .test__response {
            display: flex;
        }
        .response__action-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 32px;
        }
        .response__action {
            cursor: pointer;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-size: 16px;
            background-color: transparent;
        }
        .action--copy-to-clipboard {
            background-image: url('assets/img/icon_clipboard-copy.svg');
        }
        .response__message {
            flex-basis: 100%;
            padding: 4px;
            border-radius: 4px;
            background-color: #f8f2e9;
            border: 1px solid rgba(64, 0, 28, 0.25);
            box-shadow:
            inset 0 -15px 18px -6px rgba(12, 0, 38, .3),
            inset 0 12px 12px -4px rgba(235, 250, 12, .5),
            0 4px 5px -2.5px rgba(255, 255, 255, .3),
            0 -5px 5px -2px rgba(32, 0, 8, .25);
        }
        .response__indicator-area {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            width: 32px;
        }
        .response__indicator {
            width: 24px;
            height: 24px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, .15);
            background-color: rgba(64, 64, 64, .33);
            box-shadow:
            0 2px 4px -2.5px rgba(255, 255, 255, .3),
            0 -2px 4px -2px rgba(32, 0, 8, .25);
            transition: 
            background-color 500ms ease, 
            box-shadow 300ms ease, 
            border-color 500ms ease;
        }
        .indicator--pass {
            background-color: #32ff58;
            border-color: rgba(235, 255, 252, 0.75);
            box-shadow:
            0 0px 10px 0px rgba(64, 255, 128, .35),
            0 2px 4px -2px rgba(32, 0, 8, .25);
        }
        .indicator--fail {
            background-color: #f1084c;
            border-color: rgba(255, 119, 202, 0.75);
            box-shadow:
            0 0px 10px 0px rgba(255, 25, 88, .35),
            0 2px 4px -2px rgba(32, 0, 8, .25);
        }
        .test__controls {
            display: flex;
            height: 48px;
            align-items: baseline;
        }
        .control--last-pass-state {
            cursor: pointer;
            padding-left: 6px;
            padding-right: 6px;
            height: 32px;
            border-radius: 4px;
            border: 3px solid rgba(255, 255, 255, .75);
            box-shadow:
            inset 0 6px 10px -4px rgba(255, 255, 255, .33);
            background-repeat: no-repeat;
            background-position-x: right;
            background-size: 24px;
            background-image: url('assets/img/icon_prev--filled.svg');
        }
        .test__body--request {
            flex-basis: 112px;
            flex-grow: 0;
            display: flex;
            flex-direction: column;
        }
        .request__button-area {
            flex-basis: 50%;
            flex-grow: 1;
            margin: 0 auto;
            display: flex;
            padding: 4px;
            justify-content: space-evenly;
            align-items: center;
        }
        .request__button {
            --size: 32px;
            cursor: pointer;
            width: var(--action-size);
            height: var(--action-size);
            outline: none;
            border-radius: calc(var(--action-size) / 2);
            border: 1px solid rgba(255, 255, 245, .6);
            background-color: var(--color-action--edit);
            background-repeat: no-repeat;
            background-size: 68%;
            box-shadow: 
            inset 0px -4px 12px 0 rgba(0 0 0 / 40%),
            inset 0px 6px 12px -8px rgba(255 255 255 / 59%),
            0 -4px 6px -3px rgba(0, 0, 0, .5),
            0 1px 4px 1px rgba(255, 255, 255, .26);
            transition: border-color 300ms ease-in-out;
        }
        .request__button:focus {
            border-color: rgba(32, 32, 32, .75);
            box-shadow: 
            inset 0px -4px 12px 0 rgba(0 0 0 / 40%),
            inset 0px 6px 12px -8px rgba(255 255 255 / 59%),
            inset 0 2px 2px 0 rgba(0 0 0 / 30%),
            0 -4px 6px -3px rgba(0, 0, 0, .5),
            0 1px 4px 1px rgba(255, 255, 255, .26);
        }
        .button--reset {
            background-position: 63% 40%;
            background-image: url('assets/img/icon_prev--filled.svg');    
        }
        .button--run {
            background-color: #f0486f;
            background-position: 63% 40%;
            background-image: url('assets/img/icon_selector.svg');    
        }
        .request__option-area {
            flex-basis: 50%;
            flex-grow: 2;
            display: flex;
            justify-content: center;
            align-items: start;
            padding: 4px;
        }
        .request__progress {
            flex-basis: 32px;
            height: 32px;
            margin: 0 4px;
            border: 3px solid #fcf9fa;
            border-radius: 16px;
            background-color: rgba(250, 98, 108, .95);
            box-shadow: inset 0 -12px 9px -3.5px rgba(0, 0, 54, .35);
        }
        .request__option {
            flex-basis: 32px;
            min-height: 32px;
            margin: 0 4px;
            border: 3px solid #f08080;
            border-radius: 16px;
            background-color: #f8f9fb;
        }
        ${'style' in options ? options.style : ''}`); 
    }
}

export { TestDialogBase };