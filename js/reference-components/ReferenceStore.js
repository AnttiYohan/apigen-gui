import { StoreComponent } from "../StoreComponent.js";
import validate from "../util/validator.js";
import { ReferenceEntry } from './ReferenceEntry.js';

/**
 * This is a store for Reference entries,
 * with an ability to create and maintain references
 * of a table
 */
class ReferenceStore extends StoreComponent
{
    constructor( options = {} )
    {
        const template = 
       `<div class='component__create'>
            <p class='component__label'>New Reference</p>
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
        this.mReferences = [];

        /**
         * @property mCurrentEntry
         * ---------
         * a plaeholder for the recent entry object
         */
        this.mCurrentEntry = undefined;

        if ( 'references' in options && Array.isArray( options.references ) )
        {
            for ( const reference of options.references )
            {
                this.mReferences.push( reference );
            }
        }

        const createButton = this.shadowRoot.querySelector( '.component__action--create' );
        createButton.addEventListener( 'click', e => this.addReference() );

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
                    prop: 'ref_table',
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
    
    addReference( reference = {} )
    {
        this.addEntry( new ReferenceEntry( reference ) );
    }
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<reference-store> connected' );
        this.emit( 'reference-store-connected' );

        const r = [
            {
                available_tables: [
                    'user',
                    'recipe',
                    'product',
                    'step'
                ]
            }
        ];
        /**
         * Populate the field store
         */
        for ( const reference of r )
        {
            this.addReference( reference );
        }
    }
}

window.customElements.define( 'reference-store', ReferenceStore );

export { ReferenceStore };