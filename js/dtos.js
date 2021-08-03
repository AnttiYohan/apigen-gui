/**
 * dtos.js
 * -------
 * This is a collection of Apigen app specific
 * Data Transfer Objects, and functions
 * to create and edit them.
 */


/**
 * Creates a Map(), and goes through a reference object
 * looking for constraint types.
 * Every constraint type is added to the map,
 * Which is returned in the end.
 *  
 * @param {object} reference 
 */
function constraintMap( reference )
{
    const map = new Map();
    /**
     * Map the allowed constraints
     */
    if ( 'constraints' in reference && typeof reference.constraints === 'object' )
    {
        const c = reference.constraints;


        if ( 'autoinc' in c )
        {
            map.set( 'autoinc', c.autoinc );
        }

        if ( 'notnull' in c )
        {
            map.set( 'notnull', c.notnull );
        }

        if ( 'unique' in c )
        {
            map.set( 'unique', c.unique );
        }

        if ( 'check' in c )
        {
            map.set( 'check', c.check );
        }

        if ( 'index' in c )
        {
            map.set( 'index', c.index );
        }

        if ( 'primary_key' in c )
        {
            map.set( 'primary_key', c.primary_key );
        }
    }
 
    return map;
}

function fieldValues( reference )
{
    let name = '';

    if ( 'name' in reference )
    {
        name = reference.name;
    }

    let type = 'integer';

    if ( 'type' in reference )
    {
        type = reference.type;
    }

    let size = 0;

    if ( 'size' in reference && ! isNaN( reference.size ) )
    {
        size = Number( reference.size );
    }

    return {

        name,
        type,
        size

    }
}

export {

    fieldValues,
    constraintMap,

};