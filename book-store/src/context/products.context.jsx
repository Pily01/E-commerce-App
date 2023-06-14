import { createContext, useEffect } from "react";
import { useState } from "react";
// import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    setProducts: () => null,
    products: [],
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const value = {products, setProducts};

    useEffect(() => {
        // We have to do this because getCategories and Documents is an async function
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        };

        getCategoriesMap();
    }, [])
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}