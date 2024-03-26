const User = require('../models/user')



exports.getMyAccount = (req, res) => {

    const attributes = ['id','name','email','salaire','profession','about','createdAt'] 

    const userId = req.auth.id 

    User.findByPk(userId, {
         attributes: attributes,
    }).then((account,error) => {
          if(error || !account) {
             return res.json({error});
          }
             return res.json({account})
    }).catch(err => res.json({err}))
}



