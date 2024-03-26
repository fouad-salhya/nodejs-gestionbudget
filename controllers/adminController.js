const User = require('../models/user')
const Task = require('../models/task')
const { Op } = require('sequelize')
const moment = require('moment')



exports.getAllUsers = (req, res) => {

    const attributes = ['name','email','salaire','profession','createdAt'] 

     User.findAll({
        attributes: attributes
     })
         .then(users => res.status(200).json(users))
         .catch(err => res.json(err))
}

exports.getUserById = (req, res) => {
     
    let user = req.user

    res.json({user})
}

exports.deleteUser = (req, res) => {

    let userId = req.body.id || req.params.id

    User.destroy({
        where: {
            id: userId
        }
    })
        .then(() => res.json({}))
        .catch((err) => res.json(err))
}

exports.getRegistredUserPerDay = (req, res) => {

    const date = moment(req.query.date,'YYYYMMDD')
    const startJour = date.startOf('day').toDate()
    const endJour = date.endOf('day').toDate()

    const attributes = ['id','name','email','salaire','profession','createdAt'] 

    User.findAll({
        where: {
          createdAt: {
            [Op.between]: [startJour, endJour]
          }
        },
        attributes: attributes,
        order: [
            ['createdAt', 'DESC'],
        ],
        include: Task
    }).then(users => {
        res.json({users})
    }).catch(err => res.json({err}))
}

exports.getTasksCreatedPerDay = (req, res) => {
  
    const date = moment(req.query.date,'YYYYMMDD')
    const startJour = date.startOf('day').toDate()
    const endJour = date.endOf('day').toDate()

    Task.findAll({
        where: {
          createdAt: {
            [Op.between]: [startJour, endJour]
          }
        },
        order: [
           ['createdAt', 'DESC'],
        ]
    }).then(users => {
        res.json({users})
    }).catch(err => res.json({err}))
}

exports.getAllTasks = (req, res) => {

    Task.findAll({
        order: [
            ['createdAt','DESC']
        ],
        include: User,
    }).then(tasks => {
        res.json({tasks})
    }).catch(err => res.json(err))
}


