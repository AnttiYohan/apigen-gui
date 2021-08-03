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
       `<div class='component__create'>
            <input class='component__input' type='text' placeholder='schema'>
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
        }`

        super( { template, style } );

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
                    prop: 'title',
                    type: 'string',
                    empty: 'false'
                },
                {
                    prop: 'id',
                    type: 'number',
                    empty: 'false'
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
    
    addSchema( schema )
    {
        this.addEntry( new SchemaEntry( schema ) );
    }
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<schema-store> connected' );
        this.emit( 'schema-store-connected' );

        const entries = [
            {
                'title': 'apigen_db',
                'id': 1
            },
            {
                'title': 'kitchen_db',
                'id': 2
            },
            {
                'title': 'wordpress_db',
                'id': 3
            },
            {
                'title': 'user-api',
                'id': 4
            }
        ];

        for ( const schema of entries )
        {
            this.addSchema( schema );
        }

    }
}

window.customElements.define( 'schema-store', SchemaStore );

export { SchemaStore };