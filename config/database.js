const { Sequelize } = require('sequelize')


const connection = new Sequelize('db','root','', {
    host:'localhost',
    dialect:'mysql'
})


module.exports = connection

