const ApiError = require('../error/ApiError');
const {Users, Baskets} = require('../models/models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode');
const e = require("express");

const generateJwt = (id) => {
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn: '7d'}
    )
}

class UserController {

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password!'))
            }
            const user = await Users.findOne({where: {email:email}})
            if (!user) {
                return next(ApiError.internal('Пользователя с такой почтой не существует!'))
            }
            let comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль!'))
            }
            const token = generateJwt(user.id)
            console.log("*****", token, "*****")

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 86400000,
                sameSite: 'strict',
            })

            return res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                coins: user.coins
            });
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }


    async registration(req, res, next) {
        try {
            const {username, email, password} = req.body;
            if (!email || !password) {
                return next (ApiError.internal("Неверный пароль или почта!"));
            }
            const candidate = await Users.findOne({where: {email: email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже сущуствует!'))
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await Users.create({username: username,email: email,password: hashedPassword, role: "USER"})
            const basket = await Baskets.create({userId: user.id})

            const token = generateJwt(user.id)
            console.log("*****", token, "*****")

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 86400000,
                sameSite: 'strict',
            })

            return res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                coins: user.coins
            });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async check(req, res, next){
        try {
            const user = await Users.findOne({
                where: { id: req.user.id }
            });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }
            console.log("*****", user.id, user.username, user.email, user.role, user.coins, "*****")
            const token = generateJwt(user.id)
            console.log("*****", token, "*****")

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 86400000,
                sameSite: 'strict',
            })

            return res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                coins: user.coins
            });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async logout(req, res, next){
        try {

            console.log("*****", "Работает")
            res.cookie('token', '', {
                httpOnly: true,
                expires: new Date(0),
                path: '/',
                sameSite: 'strict',
            });

            res.status(200).json({message: "Успешно"})
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new UserController()