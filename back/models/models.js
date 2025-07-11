const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Users = sequelize.define("users", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Products = sequelize.define("products", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    rating: {type: DataTypes.REAL, allowNull: false, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
})

const Baskets = sequelize.define("baskets", {
    id_basket: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    total_price: {type: DataTypes.FLOAT, allowNull: false, defaultValue: 0},
})

const Basket_Content = sequelize.define("basket_content", {
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})

const Orders = sequelize.define("orders", {
    id_order: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    total_price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
})

const Orders_Content = sequelize.define("orders_content", {
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})

const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
})

Users.hasOne(Baskets)
Baskets.belongsTo(Users)

Users.hasMany(Orders)
Orders.belongsTo(Users)

Baskets.hasMany(Basket_Content)
Basket_Content.belongsTo(Baskets)

Orders.hasMany(Orders_Content)
Orders_Content.belongsTo(Orders)

Products.hasMany(Rating)
Rating.belongsTo(Products)

Users.hasMany(Rating)
Rating.belongsTo(Users)

Products.hasMany(Basket_Content)
Basket_Content.belongsTo(Products)

Products.hasMany(Orders_Content)
Orders_Content.belongsTo(Products)

module.exports = {
    Users,
    Baskets,
    Products,
    Basket_Content,
    Orders,
    Orders_Content,
    Rating
}