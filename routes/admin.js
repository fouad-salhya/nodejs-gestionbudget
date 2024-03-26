const express = require('express')
const router = express.Router()


const { getAllUsers, getUserById, deleteUser, getRegistredUserPerDay, getTasksCreatedPerDay, getAllTasks } = require('../controllers/adminController')
const { userById, requireSignIn, isAdmin } = require('../middlewares/auth')



router.get('/users/all',[requireSignIn,isAdmin],getAllUsers)
router.get('/:id',[requireSignIn,isAdmin],getUserById)
router.param('id',userById)
router.delete('/delete/:id',[requireSignIn,isAdmin],deleteUser)
router.get('/users/inscrit',[requireSignIn,isAdmin],getRegistredUserPerDay)

router.get('/tasks/all',[requireSignIn,isAdmin],getAllTasks)
router.get('/tasks/created',[requireSignIn,isAdmin],getTasksCreatedPerDay)

module.exports = router