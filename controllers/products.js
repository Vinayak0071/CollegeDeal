const Product = require('../models/product');

module.exports.index = async (req, res) => {
    const prod = await Product.find();
    res.render('products/index', { prod });
}

module.exports.renderNew = async (req, res) => {
    res.render('products/new');
}

module.exports.createProduct = async (req, res, next) => {
    const product = new Product(req.body.product);
    product.author = req.user._id;
    await product.save();
    req.flash('success', 'Successfully created product!');
    res.redirect('/products');
}

module.exports.showProduct = async (req, res) => {
    const prod = await Product.findById(req.params.id).populate('author');
    if (!prod) {
        req.flash('error', 'Cannot find product');
        return res.redirect('/products');
    }
    console.log(prod.author);
    res.render('products/show', { prod });
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const prod = await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully removed product!');
    res.redirect('/products');
}

module.exports.editProduct = async (req, res) => {
    const prod = await Product.findById(req.params.id);
    if (!prod) {
        req.flash('error', 'Cannot find product');
        res.redirect('/products');
    }
    res.render('products/edit', { prod });
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const prod = await Product.findByIdAndUpdate(id, { ...req.body.product });
    req.flash('success', 'Product Updated!');
    res.redirect(`/products/${prod._id}`)
}