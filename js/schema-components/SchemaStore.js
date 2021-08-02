import { StoreComponent } from "../StoreComponent.js";
import validate from "../util/validator.js";
import { SchemaEntry } from './SchemaEntry.js';

/**
 * This is a store for existing Schemas,
 * and has a Schema creator also
 */
class SchemaStore extends StoreComponent
{
    constructor()
    {
        const template = 
        `<div class='component__row'>
            <p class='component__label'><slot></p>
        </div>`;

        super( { template } );

        /**
         * @property currentProduct
         * ---------
         * a plaeholder for the recent product object
         */
        this.mCurrentEntry = undefined;

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
                    prop: 'name',
                    type: 'string',
                    empty: 'false'
                },
                {
                    prop: 'userId',
                    type: 'number',
                    empty: 'false'
                },
                {
                    prop: 'productCategory',
                    type: 'string',
                    empty: 'false'
                },
                {
                    prop: 'systemProductId',
                    type: 'number',
                    empty: 'false'
                },
                {
                    prop: 'amount',
                    type: 'number',
                    empty: 'false'
                },
                {
                    prop: 'measureUnit',
                    type: 'string',
                    empty: 'false'
                }
            ];

            /**
             * Validate
             */
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
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<schema-store> connected' );
        this.emit( 'schema-store-connected' );
    }
}

window.customElements.define( 'schema-store', SchemaStore );

export { SchemaStore };