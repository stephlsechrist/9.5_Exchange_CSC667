const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');
const app = express();

const port = 4000;

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
    console.log('check login');
    if (!req.query.password) {
      res.send({
        valid: false
      });
    }
    db.collection('users')
      .findOne({
        user: req.query.user
      })
      .then(doc => {
        console.log(doc);
        res.send({
          valid: doc !== null && doc.password === req.query.password
        });
      })
      .catch(e => {
        console.log(e);
        res.send('Error', e);
      });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
