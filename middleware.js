const ExpressError = require('./utils/ExpressError');
const Product = require('./models/product');
const { productSchema } = require('./schemas.js');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must sign-in first!')
        return res.redirect('/login');
    }
    next();
}

module.exports.validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else
        next();
}

module.exports.isAuthor = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'You are not allowed to do that!');
        return res.redirect(`/products/${id}`);
    }
    next();
}