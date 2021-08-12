const Joi = require('joi');

module.exports.productSchema = Joi.object({
    product: Joi.object({
        seller_name: Joi.string().required(),
        title: Joi.string().required(),
        image: Joi.string().required(),
        number: Joi.string().required(),
        price: Joi.string().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});