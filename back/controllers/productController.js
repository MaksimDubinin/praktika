const {Products, Rating, Review, Users} = require('../models/models');
const ApiError = require("../error/ApiError");
const { sequelize } = require('../db');


class productController {
    async getAllProducts(req, res, next) {
        try {
            const products = await Products.findAll();
            if (!products.length) {
                return next(ApiError.badRequest("Товаров нету!"));
            }
            return res.json(products);
        } catch (e) {
            return next(ApiError.internal(e));
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const {id} = req.params
            const product = await Products.findOne({
                where: {id: id},
                include: [
                    { model: Rating, attributes: ['text', 'rating', 'userId']},
                ]
            })
            if (!product) {
                return next(ApiError.badRequest('Товара с такми ID не существует!'))
            }
            return res.json(product);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async createProduct(req, res, next) {
        try {
            const {type, name, price, img} = req.body
            console.log(type, name, price, img)
            const product = await Products.create({type: type, name: name, price: price, img: img})
            return res.json(product);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async sendReview(req, res, next) {
        try {
            const productId = req.params.id
            const {rating, text, userId} = req.body
            if (!rating || !text || !productId || !userId) {
                return next(ApiError.badRequest("Не все поля заполнены!"))
            }

            const product = await Products.findByPk(productId);
            if (!product) {
                return next(ApiError.badRequest("Продукт не найден"));
            }

            const review = await Rating.create({
                rating: rating,
                text: text,
                productId: productId,
                userId: userId
            })

            const avg_rating = await Rating.findAll(
                {where: {productId},
                attributes: [
                    'id',
                    'rating'
                ],
            })

            const sum = avg_rating.reduce((total, review) => total + review.rating, 0);
            const averageRating = sum / avg_rating.length;
            const roundedRating = averageRating.toFixed(1);


            const products =  await Products.update(
                { rating: roundedRating },
                { where: { id: productId } }
            );
            return res.json(review, products);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new productController()