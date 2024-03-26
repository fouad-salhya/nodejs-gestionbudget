const { Op, DATE, Sequelize } = require('sequelize')
const Task = require('../models/task')
const moment = require('moment')



exports.createTask = (req, res) => {

      const { name, cost } = req.body

      Task.create({
         name: name,
         cost: cost,
         userId: req.auth.id,
      }).then(() => {
           res.json({message: 'task ceated'})
      }).catch(err => res.json({err}))
}

exports.getTaskByDate = (req, res) => {

     const date = req.query.date;

      Task.findAll({
        
         where: {
               userId: req.auth.id,
         createdAt: {
               [Op.gte]: moment(date,"YYYYMMDD").startOf('day').toDate(),
               [Op.lt]: moment(date,"YYYYMMDD").endOf('day').toDate()
          },
          },
         order: [
               ['createdAt', 'DESC'],      
         ],
      })
       .then(tasks => res.json({tasks}))
       .catch(err => res.json(err))
}

exports.getTaskJour = (req, res) => {

    Task.findAll({
      where: {
         userId: req.auth.id,
         createdAt: {
            [Op.gte]: moment(new Date().toISOString(),"YYYYMMDD").startOf('day').toDate(),
            [Op.lte]: moment(new Date().toISOString(),"YYYYMMDD").endOf('day').toDate()
         }
      },
      order: [
         ['createdAt', 'DESC'],   
     ]
    }).then(taskJour => res.json({taskJour}))
      .catch(err => res.json(err))
}

exports.getAllMyTasks = (req, res) => {

    Task.findAll({
       where: {
         userId: req.auth.id
       },
       order: [
         ['createdAt','DESC']
       ]
    }).then((myTasks, error) => {
         if(error) {
           return res.json({error})
         }
           return res.json({ myTasks })
    }).catch((err) => res.json(err))
}

exports.getTotalTaskCreatedPerDay = async (req, res) => {
   
   try {

      const startDate = moment(Date.now()).subtract(6, 'days').startOf('day');
      const endDate = moment(Date.now()).subtract(1, 'day').endOf('day');
  
      const data = await Task.findAll({
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
          [Sequelize.fn('SUM', Sequelize.col('cost')), 'cost'],

        ],
        where: {
          createdAt: {
            [Op.between]: [startDate.toDate(), endDate.toDate()]
          }
        },
        group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
        raw: true
      });

        const result = [];
  
        for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
          const date = m.format('YYYY-MM-DD');
          const count = data.find(d => d.date === date)?.count || 0;
          const cost = data.find(d => d.date === date)?.cost || 0;
          const dateFinal = moment(date).format('ddd')
          result.push({ dateFinal, count, cost });
        }
        res.json({result});
  
    } catch (error) {
      console.error(error)
    }
}


exports.deleteTask = (req, res) => {

      let id = req.params.id

      Task.destroy({
         where: {
            id: id
         }
      })
       .then(() => res.json({ message: 'task deleted' }))
       .catch(err => console.log(err))
}

