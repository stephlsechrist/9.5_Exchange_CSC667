// can have different topics in queue, like subqueues
// producer will specify which topic it wants to talk to
const nodemailer = require('nodemailer');
const fromEmail = 'team9.5csc667@gmail.com';
const KafkaConsumer = require('./KafkaConsumer');
const consumer = new KafkaConsumer(['myTopic', 'myOtherTopic']);

consumer.on('message', (message) => {
  // console.log("request for email received", message);
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
    subject: 'Hello World',
    text: message.value,
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