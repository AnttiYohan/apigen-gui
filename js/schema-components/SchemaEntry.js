import { WCBase } from '../WCBase.js';

/**
 * This is an singluar entry element
 * used in the SchemaStore
 * Data stored:
 * - schema title
 * - schema id
 *  
 * @emits schema-entry-connected
 */
class SchemaEntry extends WCBase
{
    constructor( options = {} )
    {
        super();

        /**
         * Entry members
         */
        this.mId    = 0;
        this.mTitle = '';

        /**
         * Check for id
         */
        if ( 'id' in options )
        {
            this.mId = options.id;
        }

        if ( 'title' in options )
        {
            this.mTitle = options.title;
        }

        // -----------------------------------------------
        // - Setup ShadowDOM and possible local styles
        // -----------------------------------------------

        this.attachShadow( { mode: 'open' } );
        this.setupTemplate(
       `<link rel='stylesheet' href='assets/css/style.css'>
        <div class='entry'>
            <h2 class='entry__title'>${this.mTitle}</h2>
            <button class='action edit'></button>
            <button class='action remove'></button>
        </div>`);
        this.mUnitIndex = 0;
        const unitFrame = this.mUnitFrame;
        let unitAmount  = unitList.length;
        let unitFocus   = false;
    
        /*const productAttributes = () =>
        {
            return {
                name:   this.mName,
                amount: this.mAmountInput.value,
                unit:   this.mUnitTitle.textContent.replaceAll(' ', '_').toUpperCase()
            };
        };*/

        const setActiveUnit = () =>
        {
            let index = 0;
            for ( const elem of unitFrame.children )
            {
                const clist = elem.classList;
                index === this.mUnitIndex ? clist.add( 'active' ) : clist.remove( 'active' ); 
                index++;
            }
        };

        // - Add click listeners and logic into the unit elements

        for ( const elem of unitFrame.children )
        {
            elem.addEventListener( 'click', e =>
            {
                const text = e.target.textContent;
                let elemIndex = 0;
                for ( const unit of unitList )
                {
                    if ( text === unit )
                    {
                        this.mUnitIndex = elemIndex;
                        setActiveUnit();
                        this.mUnitTitle.textContent = text;
                        unitFrame.classList.remove( 'visible' );
                        e.stopPropagation();
                        break;
                    }

                    elemIndex++;
                }
            });
        }

        // - Observe the unit input with click and enter - //
        this.mUnitInput.addEventListener( 'focus', e => 
        {
            unitFocus = true;
        });

        this.mUnitInput.addEventListener( 'blur', e => 
        {
            unitFocus = false;
            unitFrame.classList.remove( 'visible' );
        });

        this.mUnitInput.addEventListener( 'click', e => 
        {
            unitFrame.classList.toggle( 'visible' );
        });
    
        this.shadowRoot.addEventListener( 'keydown', e => 
        {
            const visible = unitFrame.classList.contains('visible');

            /**
             * Unit input is in focus
             */
            if ( unitFocus )
            {
                if ( visible )
                {
                    switch( e.keyCode )
                    {
                        case this.ENTER:
                        {
                            e.preventDefault();
                            this.mUnitTitle.textContent = unitList[ this.mUnitIndex ];
                            unitFrame.classList.remove( 'visible' );
                            break;
                        }
                        case this.KEYUP:
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            this.mUnitIndex > 0 
                                ? this.mUnitIndex-- 
                                : this.mUnitIndex = unitAmount - 1;

                            setActiveUnit();
                            break;
                        }
                        case this.KEYDOWN:
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            this.mUnitIndex < unitAmount - 1
                                ? this.mUnitIndex++
                                : this.mUnitIndex = 0;
                        
                            setActiveUnit();
                            break;
                        }
                    }
                }
                else if ( e.keyCode === this.ENTER )
                {
                    unitFrame.classList.add( 'visible' );
                }
            }    
        });

    
        const removeButton  = this.shadowRoot.querySelector( '.action.remove' );
        removeButton.addEventListener( 'click', e => this.remove() );

        this.shadowRoot.dispatchEvent
        (
            new CustomEvent('allergens-added', 
            {
                bubbles: true,
                composed: true,
                detail: 
                {
                    'product': this.mCurrentProduct
                }
            })
        );
         
    }

    /**
     * Return the image and the text content
     * 
     * @return {object}
     */
    get value()
    {
        const amount = this.mAmountInput.value;

        //if ( ! amount.length || ! amount ) return undefined;

        const attributes = {

            name:               this.mName, 
            productCategory:    this.mProductCategory, 
            systemProductId:    this.mSystemProductId,
            amount:             this.mAmountInput.value,
            measureUnit:        this.mUnitTitle.textContent.replaceAll(' ', '_').toUpperCase(),
            userId:             1


        };

        const allergens = this.allergens;
        for ( const key in allergens )
        {
            attributes[ key ] = allergens[ key ];
        }

        return attributes;
    }

    /**
     * Returns the allergen truth map
     */
    get allergens()
    {
        return {

            hasAllergens: this.mHasAllergens,
            hasNuts:      this.mHasNuts,
            hasEggs:      this.mHasEggs,
            hasGluten:    this.mHasGluten,
            hasLactose:   this.mHasLactose

        };
    }

    setMeasureUnit( unit )
    {
        const unitList = [
            'ml',
            'liter',
            'gr',
            'pieces',
            'cup',
            'cups',
            'tsp',
            'tbsp',
            'clove',
            'can',
            'cans',
            'slice',
            'slices',
            'a pinch of',
            'none'
        ];

        for ( const unitItem of unitList )
        {
            if ( unit === unitItem )
            {
                let index = 0;

                for ( const elem of this.mUnitFrame.children )
                {
                    const text = elem.textContent.toLowerCase();
                    const clist = elem.classList;
                    if ( text === unit )
                    {
                         clist.add( 'active' );
                         this.mUnitIndex = index;
                         this.mUnitTitle.textContent = unit;
                    }
                    else clist.remove( 'active' ); 
                    index++;
                }
            }
        }
    }
    
    // ----------------------------------------------
    // - Lifecycle callbacks
    // ----------------------------------------------

    connectedCallback()
    {
        console.log( "<schema-entry> connected" );
        this.emit( 'schema-entry-added' );
    }

    disconnectedCallback()
    {
        console.log( '<schema-entry> disconnected' );
        //this.emit( 'schema-entry-removed' );
    }
}
 
window.customElements.define( 'schema-entry', SchemaEntry );

export { SchemaEntry };