import { StoreComponent } from "../StoreComponent.js";
import validate from "../util/validator.js";
import { IndexEntry } from './IndexEntry.js';

/**
 * This is a store for IndexEntry objects.
 * The indices in this store represent
 * the indices of a database table.
 * ---------
 * Usage:
 * IndexStore object is intended to be used
 * inside a table context, for instance TableView.
 * 
 * One table has exactly one index store
 * ---------
 * properties:
 * - indices : array
 * 
 */
class IndexStore extends StoreComponent
{
    constructor( options = {} )
    {
        const template = 
       `<div class='component__create'>
            <p class='component__label'>New Index</p>
            <button class='component__action--create'></button> 
        </div>`;

        const style = 
        `.component--root {
            padding: 0;
        }
        .component__row {
            padding: 8px;
        }
        .component__create {
            padding: 8px;
            justify-content: flex-end;
        }`

        super( { template, style } );

        /**
         * @property mReferences
         * an array of stored reference entries
         */
        this.mIndices = [];

        if ( 'indices' in options && Array.isArray( options.indices ) )
        {
            for ( const index of options.indices )
            {
                this.mIndices.push( index );
            }
        }

        const createButton = this.shadowRoot.querySelector( '.component__action--create' );
        createButton.addEventListener( 'click', e => this.addIndex() );

    }

    /**
     * Iterate though the entries and return the valid ones,
     * If no valid entries, return undefined
     * 
     * @return {Array<object>|undefined}
     */
    get value()
    {
        const result = [];

        for ( const entry of this.entries )
        {
            const model = 
            [
                {
                    prop:  'fields',
                    type:  'array',
                    elem_type: 'string',
                    min: 1
                },
                {
                    prop: 'table',
                    type: 'string',
                    min: 1
                }
            ];

            if ( validate( entry, model ) )
            {
                result.push( entry );
            }
        }

        return result.length ? result : undefined;
    }

    /**
     * Adds a class into the image area element, to display
     * a red border -- when ensure is set,
     * the notification fires only when the input is not set
     * ------
     * @param {boolean} ensure
     */
    notifyRequired( ensure = true )
    {
        return '';
    }
    
    addIndex( index = {} )
    {
        this.addEntry( new IndexEntry( index ) );
    }
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    /**
     * 
     * @emits index-store-connected
     */
    connectedCallback()
    {
        console.log( '<index-store> connected' );
        this.emit( 'index-store-connected' );
    }
}

window.customElements.define( 'index-store', IndexStore );

export { IndexStore };