const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
<<<<<<< HEAD
const cors = require('cors');
const app = express();

const port = 4000;

=======
const app = express();
const port = 4000;
const  cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
app.use(cors());

// Connection URL
const url = 'mongodb://localhost:27017';
<<<<<<< HEAD

// Database Name
const dbName = 'FinalProject95';

=======
// Database Name
const dbName = 'FinalProject95';
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Connected successfully to server');
  const db = client.db(dbName);
<<<<<<< HEAD

  app.get('/api/login', (req, res) => {
    console.log('check login');
    if (!req.query.password) {
=======
  
  app.get('/api/login', (req, res) => {
    if(!req.query.password) {
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
      res.send({
        valid: false
      });
    }
<<<<<<< HEAD
=======

    console.log('check login');
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
    db.collection('users')
      .findOne({
        user: req.query.user
      })
      .then(doc => {
        console.log(doc);
        res.send({
<<<<<<< HEAD
          valid: doc !== null && doc.password === req.query.password
=======
          valid: doc !== null && doc.password === req.query.password,
          email: doc.email,
          role: doc.role
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
        });
      })
      .catch(e => {
        console.log(e);
        res.send('Error', e);
      });
  });

<<<<<<< HEAD
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
=======
  app.post('/api/register', (req, res) => {
    console.log(req.body);
    var validEntry = (req.body.password !== '') && (req.body.email.includes('@')) && (req.body.user !== '') && (req.body.role !== '')
    if(validEntry)
      console.log("ALL VALUES ENTERED");

    db.collection('users').find({$or: [ {user: req.body.user}, {email: req.body.email}]}).toArray((err, doc) => {     
      if(doc.length > 0) {
            validEntry = false;
            console.log("User with same user and/or email already exists in DB.");
        }
    });
    
    if(validEntry) {
      db.collection('users').insertOne({
          user: req.body.user, 
          email: req.body.email, 
          password: req.body.password,
          role: req.body.role
      });
    }

    res.send({
        valid: validEntry
    })
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
