const express = require('express')
const router = express.Router()


const { 
        createTask,
        deleteTask, 
        getTaskByDate, 
        getTaskJour, 
        getAllMyTasks, 
        getTotalTaskCreatedPerDay
        } = require('../controllers/taskController')
const { requireSignIn } = require('../middlewares/auth')




router.post('/create',[requireSignIn],createTask)
router.get('/specifique',[requireSignIn],getTaskByDate)
router.get('/jour',[requireSignIn],getTaskJour)
router.delete('/delete/:id',[requireSignIn],deleteTask)
router.get('/all',[requireSignIn],getAllMyTasks)
router.get('/day/total',[requireSignIn],getTotalTaskCreatedPerDay)


module.exports = router