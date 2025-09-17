const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {

        if (req.method === "OPTIONS") {
            return next()
        }

        const token = req.cookies.token

        console.log("***** работает *****")

        if (!token) {
            console.log("***** Не авторизован *****")
            return res.status(401).json({message: "Не авторизован"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log("***** Авторизован *****")
        console.log(decoded)
        req.user = decoded;
        next()
    } catch (e) {
        return  res.status(401).json({message: e.message})
    }
};