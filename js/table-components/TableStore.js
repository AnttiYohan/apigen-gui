import { StoreComponent } from "../StoreComponent.js";
import validate from "../util/validator.js";
import { TableEntry } from './TableEntry.js';

/**
 * This is a store for Table entries,
 * with an ability to create new Table entries
 */
class TableStore extends StoreComponent
{
    constructor()
    {
        const template = 
       `<div class='component__create'>
            <input class='component__input' type='text' placeholder='table'>
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
                    prop: 'name',
                    type: 'string',
                    empty: 'false'
                },
                {
                    prop: 'fields',
                    type: 'array'
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
    
    addTable( table )
    {
        this.addEntry( new TableEntry( table ) );
    }
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( '<table-store> connected' );
        this.emit( 'table-store-connected' );

        const entries = [
            {
                'name': 'user',
                'id': 1,
                'fields': 
                [
                    {
                        'key': 'id',
                        'type': 'int',
                        'constraints':
                        {
                            'autoinc': [1, 0],
                            'notnull': true
                        },
                        'primary_key': true
                    },
                    {
                        'key': 'username',
                        'type': 'varchar',
                        'size': 128,
                        'constraints':
                        {
                            'notnull': true,
                            'unique': true
                        }
                    },
                    {
                        'key': 'email',
                        'type': 'varchar',
                        'size': 256,
                        'constraints':
                        {
                            'notnull': true,
                            'unique': true
                        }
                    },
                    {
                        'key': 'password',
                        'type': 'varchar',
                        'size': 256,
                        'constraints':
                        {
                            'notnull': true
                        }
                    }
                ]
            },
            {
                'name': 'api',
                'id': 2,
                'fields': 
                [
                    {
                        'key': 'id',
                        'type': 'int',
                        'constraints':
                        {
                            'autoinc': [1, 0],
                            'notnull': true
                        },
                        'primary_key': true
                    },
                    {
                        'key': 'title',
                        'type': 'varchar',
                        'size': 128,
                        'constraints':
                        {
                            'notnull': true,
                            'unique': true
                        }
                    },
                    {
                        'key': 'version',
                        'type': 'integer',
                        'constraints':
                        {
                            'notnull': true
                        }
                    }
                ]
            },
            {
                'name': 'schema',
                'id': 3,
                'fields': 
                [
                    {
                        'key': 'id',
                        'type': 'integer',
                        'constraints':
                        {
                            'autoinc': [1, 0],
                            'notnull': true
                        },
                        'primary_key': true
                    },
                    {
                        'key': 'title',
                        'type': 'varchar',
                        'size': 256,
                        'constraints':
                        {
                            'notnull': true
                        }
                    },
                    {
                        'key': 'api_id',
                        'type': 'integer',
                        'references':
                        {
                            'table_id': 1,
                            'field_id': 12,
                            'action':
                            {
                                'on_delete': 'cascade',
                                'on_update': 'cascade'
                            }
                        }
                    }
                ]
            },
            {
                'name': 'tables',
                'id': 4,
                'fields': 
                [
                    {
                        'key': 'id',
                        'type': 'integer',
                        'constraints':
                        {
                            'autoinc': [1, 0],
                            'notnull': true
                        },
                        'primary_key': true
                    },
                    {
                        'key': 'name',
                        'type': 'varchar',
                        'size': 256,
                        'constraints':
                        {
                            'notnull': true
                        }
                    },
                    {
                        'key': 'schema_id',
                        'type': 'integer',
                        'references':
                        {
                            'table_id': 1,
                            'field_id': 12,
                            'action':
                            {
                                'on_delete': 'cascade',
                                'on_update': 'cascade'
                            }
                        }
                    }
                ]
            },
            {
                'name': 'field',
                'id': 5,
                'fields': 
                [
                    {
                        'key': 'id',
                        'type': 'integer',
                        'constraints':
                        {
                            'autoinc': [1, 0],
                            'notnull': true
                        },
                        'primary_key': true
                    },
                    {
                        'key': 'name',
                        'type': 'varchar',
                        'size': 256,
                        'constraints':
                        {
                            'notnull': true
                        }
                    },
                    {
                        'key': 'type',
                        'type': 'varchar',
                        'size': 32,
                        'constraints':
                        {
                            'notnull': true
                        },
                        'enum':
                        [
                            'INT',
                            'BIT',
                            'CHAR'
                        ]
                    },
                    {
                        'key': 'table_id',
                        'type': 'integer',
                        'references':
                        {
                            'table_id': 2,
                            'field_id': 3,
                            'action':
                            {
                                'on_delete': 'cascade',
                                'on_update': 'cascade'
                            }
                        }
                    }
                ]
            }
        ];

        for ( const table of entries )
        {
            this.addTable( table );
        }

    }
}

window.customElements.define( 'table-store', TableStore );

export { TableStore };