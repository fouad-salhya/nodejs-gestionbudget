const { DataTypes } = require('sequelize')
const connection = require('../config/database')


const user = connection.define('users', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    salaire: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

})


module.exports = user