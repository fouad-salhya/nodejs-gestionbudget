const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connection = require('./config/database')


// middlewares

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// routes

const tasks = require('./routes/tasks')
app.use('/api/tasks',tasks)

const auths = require('./routes/auths')
app.use('/api/auth',auths)

const users = require('./routes/users')
app.use('/api/users',users)

const admin = require('./routes/admin')
app.use('/api/admin',admin)

const accounts = require('./routes/accounts')
app.use('/api/accounts', accounts)

// database

connection.sync()
          .then(() => console.log('database connected ...'))
          .catch(err => console.log(err))

// models

const User = require('./models/user')
const Task = require('./models/task')

// relationchips

User.hasMany(Task, {

    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Task.belongsTo(User, {

    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// server

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server started to port ${port} ...`))