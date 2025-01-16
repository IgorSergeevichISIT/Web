const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'test_db', // Название БД
    'postgres', // Пользователь
    'Fhvfnehf113', // Пароль
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
)