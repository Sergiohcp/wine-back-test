var express = require('express');
const products = require('./src/products');
const { filteredProducts } = require('./src/utils');
require('dotenv').config()


var app = express();

app.get('/', function(request, response) {
    response.send('Use /products?page={page}&limit={limit}&filter={filter} to get products');
  });

app.get('/products', function(request, response) {

    const { page: queryPage, limit: queryLimit, filter } = request.query;

    const page = !queryPage ? 1 : Number(queryPage)
    const limit = !queryLimit ? products.length : Number(queryLimit)

    const { items, totalItems } = filteredProducts(page, limit, filter);

    const totalPages = Math.ceil((totalItems.length / limit));

    response.json({
        page: page,
        totalPages,
        itemsPerPage: items.length,
        totalItems: totalItems.length,
        items,
    })
});

app.listen(process.env.PORT || 8080, function() {
  console.log(`Servidor iniciado na porta ${process.env.PORT || 8080}`);
});