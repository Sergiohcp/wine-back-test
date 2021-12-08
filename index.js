var express = require('express');
var cors = require('cors')
const products = require('./src/products');
const { filteredProducts } = require('./src/utils');
require('dotenv').config()

var app = express();

app.use(cors())

app.get('/', function(request, response) {
    response.send('Use /products?page={page}&limit={limit}&filter={filter} to get products');
  });

app.get('/products', function(request, response) {

    const { page: queryPage, limit: queryLimit, filter, name } = request.query;

    const page = !queryPage ? 1 : Number(queryPage)
    const limit = !queryLimit ? products.length : Number(queryLimit)

    const { items, totalItems } = filteredProducts(page, limit, filter, name);

    const totalPages = Math.ceil((totalItems / limit));

    response.json({
        page: page,
        totalPages,
        itemsPerPage: items.length,
        totalItems,
        items,
    })
});

app.listen(process.env.PORT || 8080, function() {
  console.log(`Servidor iniciado na porta ${process.env.PORT || 8080}`);
});