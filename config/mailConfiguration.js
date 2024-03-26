const nodemailer = require('nodemailer')
const Transport = require('nodemailer-sendinblue-transport')
require('dotenv').config()


const transport = nodemailer.createTransport(
    new Transport({ apiKey: process.env.SENDINBLUE_API })
   )


module.exports = transport