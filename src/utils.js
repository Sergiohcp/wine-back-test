const products = require("./products");

function filteredProducts(page, limit, filter) {
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
    return {
        items: mappedProducts,
        totalItems: productsToFilter,
    };
}

module.exports = {
    filteredProducts
}