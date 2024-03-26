const { DataTypes } = require('sequelize')
const connection = require('../config/database')

const task = connection.define('tasks', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{ timestamps: true})



module.exports = task
