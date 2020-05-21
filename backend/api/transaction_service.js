const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 4002;
const bodyParser = require('body-parser');
const redis = require('redis');
const redisClient = redis.createClient();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'FinalProject95';
// Create a new MongoClient
const client = new MongoClient(url);
const cors = require('cors')
app.use(cors());

client.connect(err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('Connected successfully to transaction server');
    const db = client.db(dbName);
   
    app.get('/api/transcation', (req, res) => {
        db.collection('transactions').insertOne({
            id: req.body.id,
            timeOfPurchase: Date.now(),
            //buyer: req.body.buyer,
            seller: req.body.seller,
            price: req.body.price,
            description: req.body.description
        })
        .then(
            res.send({
                valid: true
            })
        )
        .catch(
            res.send({
                valid: false
            }))
    })
        
    app.listen(port, () => console.log(`Inventory service listening on port ${port}!`));
});
