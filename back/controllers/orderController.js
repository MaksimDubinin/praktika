const {Orders_Content, Basket_Content,Baskets, Orders, Products, Users} = require('../models/models');
const ApiError = require("../error/ApiError");

class basketController {
    async createOrder(req, res, next) {
        try {
            const {id} = req.body;
            const basket = await Baskets.findOne({
                where: {userId: id},
            })
            if (!basket) {
                return next(ApiError.badRequest("Такой корзины не существует!"))
            }
            const order_content = await Basket_Content.findAll({
                where: {basketIdBasket: basket.id_basket},
                include: {model: Products, attributes: ['price']},
            })
            if (order_content.length === 0) {
                return next(ApiError.badRequest("Ваша корзина пуста!"))
            }
            const order = await Orders.create({
                total_price: basket.total_price,
                userId: id,
                date: Date.now(),
            })
            const orderItem = []
            for (const item of order_content) {
                const orderItem = await Orders_Content.create({
                    orderIdOrder: order.id_order,
                    productId: item.productId,
                    quantity: item.quantity,
                })
            }
            await Basket_Content.destroy({
                where: { basketIdBasket: basket.id_basket }
            });

            await Baskets.update(
                { total_price: 0 },
                { where: { id_basket: basket.id_basket } }
            );
            return res.json({message: "Успешно создан заказ!"})
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    // Для админа додлжна быть доступна
    async getAllOrders(req, res, next) {
        try {
            const orders = await Orders.findAll({
                include: [{model: Users, attributes: ['username', 'email']}],
            })
            if (orders.length === 0) {
                return next(ApiError.badRequest("Заказов нет!"))
            }
            return res.json(orders);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async getAllOrderByUserId(req, res, next) {
        try {
            const {id} = req.query;
            const orders = await Orders.findAll({
                where: {userId: id},
                include: {model: Orders_Content, attributes: ['quantity', 'orderIdOrder', 'productId']},
            })
            if (orders.length === 0) {
                return next(ApiError.badRequest("Заказов нет!"))
            }
            return res.json(orders);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new basketController()