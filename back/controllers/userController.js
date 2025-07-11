const ApiError = require('../error/ApiError');
const {Users, Baskets} = require('../models/models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '6h'}
    )
}

class UserController {

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password!'))
        }
        const user = await User.findOne({where: {email:email}})
        if (!user) {
            return next(ApiError.internal('Пользователя с такой почтой не существует!'))
        }
        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль!'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }


    async registration(req, res, next) {
        try {
            const {username, email, password} = req.body;
            if (!email || !password) {
                return next (ApiError.internal("Неверный пароль или почта!"));
            }
            const condidate = await Users.findOne({where: {email: email}})
            if (condidate) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже сущуствует!'))
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await Users.create({username: username,email: email,password: hashedPassword, role: "USER"})
            const basket = await Baskets.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async check(req, res, next){
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }
}

module.exports = new UserController()