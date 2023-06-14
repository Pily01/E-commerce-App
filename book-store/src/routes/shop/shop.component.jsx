
import { useContext, Fragment } from 'react'
import { CategoriesContext } from '../../context/categories.context'

import ProductCard from '../../components/product-card/product-card.component'
import CategoryPreview from '../../components/category-preview/category-preview.component'

import './shop.styles.scss'

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return(
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => (
                    <Fragment key={title}>
                        <CategoryPreview title={title} products={categoriesMap[title]}/>
                    </Fragment>
                ))  
            }
        </Fragment>
        
    )
}

export default Shop