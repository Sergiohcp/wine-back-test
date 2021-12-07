const products = require("./products");

function verifyProductName(productName, filterName) {
    const productNameNormalized = productName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"").toLowerCase();
    const filterNameNormalized = filterName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"").toLowerCase();
    return productNameNormalized.includes(filterNameNormalized);
}

function filteredProducts(page, limit, filter, name) {
    let productsToFilter = []

    if (!filter || typeof filter !== 'string' || !filter.includes('-')) {
        productsToFilter = products;
    } else {
        const splittedFilter = filter.split('-');
        const lowPrice = splittedFilter.find((_, index) => index === 0);
        const highPrice = splittedFilter.find((_, index) => index === 1);
        productsToFilter = products.filter(item => item.priceMember >= Number(lowPrice) && item.priceMember <= Number(highPrice));
    }

    const init = (page - 1) * limit;
    const final = init + limit;
    const mappedProducts = productsToFilter.filter((_, index) => index >= init && index < final);


    if (!!name && typeof name === 'string') {
        const mappedProductsByName = mappedProducts.filter(item => verifyProductName(item.name, name));     
        return {
            items: mappedProductsByName,
            totalItems: mappedProductsByName.length,
        };
    }

    return {
        items: mappedProducts,
        totalItems: productsToFilter.length,
    };
}

module.exports = {
    filteredProducts
}