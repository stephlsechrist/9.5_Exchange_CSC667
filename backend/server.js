const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 4000;
const  cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
const redisClient = redis.createClient();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'FinalProject95';
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

  app.get('/api/login', (req, res) => {
    if(!req.query.password) {
      res.send({
        valid: false
      });
    }
    
    console.log('check login');
    db.collection('users')
    .findOne({
      user: req.query.user
    })
    .then(doc => {
      console.log(doc);
      res.send({
        valid: doc !== null && doc.password === req.query.password,
        email: doc.email,
        role: doc.role
      });
    })
    .catch(e => {
      console.log(e);
      res.send('Error', e);
    });
        redisClient.incr('/api/login', (err, updatedValue) => {});
  });
  
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
      redisClient.incr('/api/register', (err, updatedValue) => {});
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