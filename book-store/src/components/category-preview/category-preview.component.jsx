import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {

    return(
        <div className='category-preview-container'>
            <h2><span> {title.toUpperCase()} </span></h2>
            <div className='preview'>
                {
                    products.filter((_,indx) => indx < 4).map(product => {
                        return(
                            <ProductCard key={product.id} product={product}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryPreview;