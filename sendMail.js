var nodemailer = require('nodemailer');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


export default function sendMail(body)
{
  const event = new Date();
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: 'good.kat.official@gmail.com',
     pass: 'Erty123!'
   }
  });

  var mailOptions = {
   from: 'good.kat.official@gmail.com',
   to: 'andreas.touloupis@gmail.com',
   subject: 'labonneaffaire -'+event.toLocaleDateString('fr-FR', options),
   html: body
  };

  transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
  });
}
