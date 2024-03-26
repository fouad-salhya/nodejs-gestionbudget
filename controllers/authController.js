const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transport = require('../config/mailConfiguration')
require('dotenv').config()


exports.signup = async (req, res) => {

    try {

        const { name, email, password, profession, phone , salaire } = req.body
        
        const hashed_password = await bcrypt.hash(password,10)

        const user = await User.create({
            name: name,
            email: email,
            password: hashed_password,
            profession: profession,
            phone: phone,
            salaire: parseFloat(salaire)
          })

          if(!user) {
           return res.status(400).json({ error: 'Utlisateur n est pas creer' });   
          }
          
          const token = jwt.sign({ id: user.id }, process.env.JWT_EMAIL);

          // Création de l'e-mail de confirmation
          const confirmationUrl = `${process.env.CLIENT_URL_VERIFICATION}/${token}`;
          const mailOptions = {
            from: process.env.SENDINBLUE_EMAIL,
            to: email,
            subject: 'Confirmation de votre adresse e-mail',
            text: `Cliquez sur ce lien pour confirmer votre adresse e-mail : ${confirmationUrl}`,
          };

          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail de confirmation.' });
            } else {
              return res.status(201).json({ message: 'Utilisateur créé avec succès. Veuillez vérifier votre e-mail pour confirmer votre adresse.' });
            }
          });
        } 
      catch (err) {
        res.status(500).json({ err: 'Une erreur s\'est produite' });
    }
}

exports.verifyEmail = async (req, res) => {
  
    try {
      
    const token = req.params.token
    
    const decodedToken = jwt.verify(token, process.env.JWT_EMAIL);
    const userId = await decodedToken.id;
    console.log(userId)
    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'L\'utilisateur est introuvable.' });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: 'L\'adresse e-mail a déjà été vérifiée.' });
    }
    
     user.email_verified = true

     await user.save()

    res.status(200).json({ message: 'Votre adresse e-mail a été vérifiée avec succès.' });
      
    } catch (error) {
      res.status(500).json({ message: 'Erreur interne du serveur.' });

    }

}

exports.signin = async (req, res) => {
 

        try {

            const { email, password } = req.body;
    
        // Vérifie si l'utilisateur existe
        const existingUser = await User.findOne({
          where: {
            email
          }
        });
        if (!existingUser) {
            return res.status(401).json({error: 'email incorrect'});
          }
      
          // Vérifie le mot de passe
          const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({error: 'password incorrect'});
          }
          // Crée le token JWT
          const token = jwt.sign({ id: existingUser.id, role: existingUser.role }, process.env.JWT, { expiresIn: "7d" });

            const { id, role } = existingUser
            
            res.status(200).json({ token, user: { id, role }});
            
        } catch (err) {
            
            res.status(500).json({err: 'Une erreur s\'est produite'});
        }
}

exports.signout = async (req, res) => {

    try {
        // Détruit le cookie contenant le token JWT
        res.clearCookie('jwt');
        res.status(200).json({message: 'Déconnexion réussie'});
      } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Une erreur s\'est produite'});
      }
}