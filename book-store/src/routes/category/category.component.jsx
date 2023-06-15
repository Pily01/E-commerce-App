import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../context/categories.context';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams(); 
    const { categoriesMap } = useContext(CategoriesContext);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return(
        <div>
            <h1>{category.toUpperCase()}</h1>
            <div className='category-container-section'>
                {products && products.map((product) => {
                    return(
                        <ProductCard key={product.id} product={product}/>
                    )
                })}
            </div>
        </div>
        
    )

}

export default Category;