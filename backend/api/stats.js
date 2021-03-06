// display stats: from lab 7
// need to have redis open

const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient();
const port = 3001;

app.get('/api/stats', (req, res) => {
    // res.send('Hello world!');
    client.publish('myPubSubChannel', `${process.env.NODE_APP_INSTANCE} has been visited`);
    const hits = [];
    client.get('/api/login', (err, value) => {
        hits.push(`Login : ${value || 0} Visits!!`);
        client.get('/api/register', (err, value) => {
            hits.push(`Register : ${value || 0} Visits!!`);
            res.send(hits.join("<br />") + "<br />");
        });
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));