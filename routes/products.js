const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const { productSchema } = require('../schemas.js')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateProduct, isAuthor } = require('../middleware');
const products = require('../controllers/products');


router.route('/')
    .get(catchAsync(products.index))
    .post(isLoggedIn, validateProduct, catchAsync(products.createProduct))

router.route('/new')
    .get(isLoggedIn, products.renderNew)

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .delete(isLoggedIn, isAuthor, catchAsync(products.deleteProduct))
    .put(isLoggedIn, isAuthor, validateProduct, catchAsync(products.updateProduct))

router.route('/:id/edit')
    .get(isLoggedIn, isAuthor, catchAsync(products.editProduct))

module.exports = router;