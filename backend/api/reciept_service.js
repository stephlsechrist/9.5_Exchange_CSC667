const express = require('express');
const app = express();
const port = 4004;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

const nodemailer = require('nodemailer');
const fromEmail = 'team9.5csc667@gmail.com';
const KafkaConsumer = require('./KafkaConsumer');
const consumer = new KafkaConsumer(['myTopic', 'myOtherTopic']);

consumer.on('message', (message) => {
  // console.log("request for email received", message);
  var data = JSON.parse(message.value);
  var emailText = "Here is your reciept from the 9.5 Exchange. You purchased " + data.name + " from " 
   + data.seller + " for " + data.price + " ! Congratulations!       Item Description: " + data.description;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromEmail,
      pass: 'csc667final', // DO NOT COMMIT THIS
    },
  });
  
  const mailOptions = {
    from: fromEmail,
    to: fromEmail,
    subject: 'Your Reciept from the 9.5 Exchange!',
    text: emailText,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

consumer.connect();