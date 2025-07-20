const {Products, Basket_Content,Baskets} = require('../models/models');
const ApiError = require("../error/ApiError");
const { sequelize } = require('../db');
const {where} = require("sequelize");


class basketController {
    async getAllProductsFromBasket(req, res, next) {
        try {
            const {id} = req.query;
            const basket = await Baskets.findOne({where: {userId: id}})
            if (!basket) {
                return next(ApiError.badRequest("Корзины пользователя не существует!"))
            }
            const content = await Basket_Content.findAll({
                where: {basketIdBasket: basket.id_basket},
                include: [
                    {
                        model: Baskets,
                        attributes: ['total_price']
                    },
                    {
                        model: Products,
                        attributes: ['id', 'name', 'price', 'type', 'rating', 'img']
                    }
                ]
            });
            if (content.length === 0) {
                return next(ApiError.badRequest("Ваша корзина пуста!"))
            }
            return res.json(content);
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async addProductToBasket(req, res, next) {
        try {
            const {id_product, id, quantity} = req.body;
            const basket = await Baskets.findOne({where: {userId: id}})
            if (!basket) {
                return next(ApiError.badRequest("Корзины пользователя не существует!"))
            }

            const isInBasket = await Basket_Content.findOne({
                where: {productId: id_product, basketIdBasket: basket.id_basket},
            });
            if (!isInBasket) {
                const content = await Basket_Content.create({
                    quantity: quantity,
                    basketIdBasket: basket.id_basket,
                    productId: id_product,
                })
            } else {
                const content = await Basket_Content.findOne({
                    where: {productId: id_product}
                })
                const new_quantity = content.quantity + quantity;
                const updated_basket = await Basket_Content.update(
                    {quantity: new_quantity},
                    {where: {productId: id_product, basketIdBasket: basket.id_basket}}
                )
            }


            const price = await Basket_Content.findAll({
                where: {basketIdBasket: basket.id_basket},
                include: [{ model: Products, attributes: ['price'] }]
            })

            const totalPrice = price.reduce((sum, item) => {
                return sum + (item.quantity * item.product.price);
            }, 0);

            const newBasket = await Baskets.update(
                {total_price: totalPrice} ,
                {where: {id_basket: basket.id_basket},}
            )
            const updatedBasket = await Baskets.findOne(
                {where: {id_basket: basket.id_basket}},
            )
            return res.json(updatedBasket);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async deleteFromBasket(req, res, next) {
        try {
            const {id_product, id} = req.body;
            const basket = await Baskets.findOne({
                where: {userId: id},
            })
            const deleteProduct = await Basket_Content.destroy({
                where: {productId: id_product, basketIdBasket: basket.id_basket},
            })

            const price = await Basket_Content.findAll({
                where: {basketIdBasket: basket.id_basket},
                include: [{ model: Products, attributes: ['price'] }]
            })

            const totalPrice = price.reduce((sum, item) => {
                return sum + (item.quantity * item.product.price);
            }, 0);

            const newBasket = await Baskets.update(
                {total_price: totalPrice} ,
                {where: {id_basket: basket.id_basket},}
            )
            const updatedBasket = await Baskets.findOne(
                {where: {id_basket: basket.id_basket}},
            )
            return res.json(updatedBasket);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new basketController()