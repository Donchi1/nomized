const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'stmp.gmail.com',
  port: 465,
  secure: true,
  service: 'zoho',
  auth: {
    user: process.env.EMAIL_AUTH,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
})

export default  transporter
