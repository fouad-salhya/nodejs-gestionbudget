const expressJwt = require('express-jwt')
require('dotenv').config()
const User = require('../models/user')

exports.requireSignIn = expressJwt({
    secret: process.env.JWT,
    algorithms: ["HS256"],
    userProperty: 'auth'
})


exports.userById = (req, res, next, id) => {
    
    const attributes = ['name','email','salaire','profession','createdAt']

    User.findByPk(id, {
        attributes: attributes
    })
        .then(user => {
            if(!user) {

                return res.status(404).json({message: "User not found"});
            }

            req.user = user

            next()
        }) 
}

exports.isMyAccount = (req, res, next) => {

    let user = req.user && req.auth && req.profile.id == req.auth.id

    if(!user) {

       return  res.status(404).json({message: 'Access denied'})
    }

    next()
}

exports.isAdmin = (req, res, next) => {

    if(req.auth.id == 0) {

        return res.json({message: "Admin Resource, Access Denied !"})
    }

    next()
}