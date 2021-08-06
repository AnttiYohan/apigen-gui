import { TestDialogBase } from '../TestDialogBase.js';

/**
 * This is a test dialog for table reference testing,
 * based on TestDialogBase, which is extended.
 * ---------------------
 * context: 
 * all foreign key references in a table.
 * By the virtue of its concept, a reference does
 * always point to a primary key (single or compound),
 * whether this will be in the same context, or in 
 * a foreign table.
 * 
 * ---------------------
 * core functionality
 * 
 * One ReferenceTestDialog controls and runs tests
 * for all references in a certain table.
 * The references are iterated through one by one --
 * test task results are stored for each of the references,
 * and when completed, they are displayed in the response area.
 * 
 * Each passing test (references, setup, results) are
 * stored in local store in a index called 'last-pass-state'.
 * 
 * It may be viewed by the user in the dialog itself.
 * It may also be copied on the clipboard by clicking an action.
 * 
 * --- Tests
 * 
 * The test tasks are as follows for each reference:
 * 
 *  - Take the reference field collection,
 *    Which is called 'foreign key'.
 *    Ensure that our table fields matches with it.
 * 
 *  - Take the referred table name.
 *    Ensure that the table is present in the scheme.
 * 
 *  - Take the primary key of the referred table.
 *    Ensure that the referred primary key and
 *    the foreign key are a type match.
 * 
 *  * The tasks are executed in a specific sequence, which
 *    Allows us to assume that if a task fails, all remaining 
 *    tasks would also fail.
 *    When a task fails, there is no need to proceed further.
 * 
 * --- Options
 * 
 * 2.1 reference auto routing
 * 
 * The reference test dialog can automate the routing and naming 
 * of the referenced field names in the reference table PK.
 * Since we know that the foreign key points to a primary key in
 * a foreign table, we do only need to know the table, and then
 * check the fields of its primary key.
 * 
 * Here, the fields must be an exact type match with the foreign key
 * fields. The names are stored in the reference entry.
 * 
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
class ReferenceTestDialog extends TestDialogBase
{
    constructor()
    {
        const template =
        `<div class='reference'></div>`;

        const style = 
        `.reference {
            flex-basis: 100px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding: 6px;
        }`;
        super( { title: 'Table References', template, style } ); 
    }

    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    /**
     * Emit component's 'connected' event
     * 
     * @emits reference-test-dialog-connected
     */
    connectedCallback()
    {
        console.log( '<reference-test-dialog> connected' );
        this.emit( 'reference-test-dialog-connected' );
    }
 
    disconnectedCallback()
    {
        console.log( '<reference-test-dialog> disconnected' );
    }
}

window.customElements.define( 'reference-test-dialog', ReferenceTestDialog );

export { ReferenceTestDialog };