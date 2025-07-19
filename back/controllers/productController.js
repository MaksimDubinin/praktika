const {Products, Rating, Review, Users} = require('../models/models');
const ApiError = require("../error/ApiError");
const { sequelize } = require('../db');
const uuid = require('uuid')
const path = require('path')

class productController {
    async getAllProducts(req, res, next) {
        try {
            const {type} = req.query
            let products
            if (type === "Все типы") {
                products = await Products.findAll()
            } else {
                products = await Products.findAll({where: {type: type}})
            }
            if (products.length === 0) {
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
                where: { id: id },
                include: [
                    {
                        model: Rating,
                        attributes: ['text', 'rating', 'userId', 'id'],
                        include: [{
                            model: Users,
                            attributes: ['username']
                        }]
                    }
                ]
            });
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
            const {type, name, price} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, `..`, 'static', filename))
            const product = await Products.create({
                    type: type,
                    name: name,
                    price: price,
                    img: filename
            })
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

            const ifAlreadyComment = await Rating.findOne(
                {where: {userId: userId, productId: productId}},
            )

            if (ifAlreadyComment) {
                return next(ApiError.badRequest("Вы уже оставляли отзыв на этот товар"));
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