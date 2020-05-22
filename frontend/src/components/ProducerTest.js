const KafkaProducer = require('../../../backend/api/kafka/KafkaProducer');
const express = require('express');

const producer = new KafkaProducer('myTopic');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('pushing new item to queue')
    producer.send('Hello World'); // when we write a request to queue, we don't wait for processing // change this to change email body
    res.send("Item added to queue"); // responds to FE right after sending request to queue
});

// put app.listen in here so that the app doesn't start listening until producer is connected 
producer.connect(() => {
    app.listen(port);
})
