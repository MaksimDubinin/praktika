const {Products, Basket_Content,Baskets} = require('../models/models');
const ApiError = require("../error/ApiError");
const { sequelize } = require('../db');


class basketController {
    async getAllProductsFromBasket(req, res, next) {
        try {
            const id = req.params.id;
            const basket = await Baskets.findOne({where: {id: id}})
            if (!basket) {
                return next(ApiError.badRequest("Корзины с таким ID не существует!"))
            }
            const content = await Basket_Content.findAll(
                {where: {basketIdBasket: id}}
            )
            return res.json(content);
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async addProductToBasket(req, res, next) {

    }


}

module.exports = new basketController()