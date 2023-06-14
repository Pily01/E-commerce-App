import { createContext, useEffect } from "react";
import { useState } from "react";
// import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap, setCategoriesMap};

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

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}