const sequelize = require('./db/db')
const {DataTypes} = require('sequelize')

const Stock = sequelize.define('stock', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    src: {type: DataTypes.STRING, defaultValue: "../assets/cat1.jpg"},
    title: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
})

module.exports = {Stock}