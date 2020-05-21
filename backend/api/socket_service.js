var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const redis = require('redis');
const redisClient = redis.createClient();

const {
    MongoClient,
    ObjectID
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'FinalProject95';
// Create a new MongoClient
const mclient = new MongoClient(url);
const cors = require('cors')
app.use(cors());

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});
var CURRENT = {};

mclient.connect(err=>{
    if (err) {
        console.log(err);
        process.exit(1);
    }
    io.on('connection', function(client) {
        const db = mclient.db(dbName);
        console.log('Client connected...');
    
            client.on("visitadd", function (data)
            {
                if(CURRENT[data.userid]){
                    
                }else{
                    CURRENT[data.userid] = data.id;
                }
                console.log(CURRENT);
                var c1 = 1;
                db.collection('current_items').findOne({ id: data['id']}).then(doc => {
                    if(doc == null){
                         db.collection('current_items').insertOne({
                            id: data['id'],
                            count: '1',
                        });
                        var row = {id : data.id,count : c1}
                        client.broadcast.emit("allsend", row);
                    }else{
                        c1 = parseInt(doc['count']);
                        c1++;
                        db.collection('current_items').update({ id : doc['id'] },{ count : c1,id : doc['id'] });
                        var row = {id : data.id,count : c1}
                        client.broadcast.emit("allsend", row);
                    }
                })
                .catch(e => {
                });
            });
    
            client.on("visitdel", function (data)
            {
                console.log(CURRENT);
                if(CURRENT[data.userid]){
                    delete CURRENT[data.userid];
                }
                console.log(CURRENT);
                var c2 = 1;
                db.collection('current_items').findOne({ id: data.id}).then(doc => {
                    if(doc == null){
                         db.collection('current_items').insertOne({
                            id: data.id,
                            count: '1',
                        });
                        var row = {id : data.id,count : c2}
                        console.log(row);
                        client.broadcast.emit("allsend", row);
                    }else{
                        c2 = parseInt(doc['count']);
                        c2--;
                        db.collection('current_items').update({ id : doc['id'] },{ count : c2,id : doc['id'] });
                        var row = {id : data.id,count : c2}
                        console.log(row);
                        client.broadcast.emit("allreceive", row);
                    }
                })
                .catch(e => {
                });
            });
            
            redisClient.publish('pageCounter', `Item has been visited`); //publishes a message to a channel
            redisClient.incr(client.handshake.query.itemId, (err, updatedValue) => { //redish take care of sync and return vlaue
                if (err) console.log(err);
                client.emit('liveV', updatedValue);
                //res.json({visit:updatedValue}) 
                //res.send(`Hello from instance: ${req.query.itemId}, ${updatedValue} Visits!!!`);
            });
        
    
        var eventstest = [
            'join',
            'gfrdweqsw'
        ]
            
        eventstest.forEach(element => {
            client.on(element, function(data) {
                console.log(data);
                 client.emit('messages', 'Hello from server');
            });
        });
        
        client.on('disconnect', function(data) {
               console.log(data);
               console.log(client.handshake.query.itemId);
               if(CURRENT[client.handshake.query.itemId]){
                   
                   console.log(CURRENT[client.handshake.query.itemId]);
                    
                   var c2 = 1;
                   var data = {};
                   data['id'] = CURRENT[client.handshake.query.itemId];
                   delete CURRENT[client.handshake.query.itemId];
                    db.collection('current_items').findOne({ id: data.id}).then(doc => {
                        if(doc == null){
                            db.collection('current_items').insertOne({
                                id: data.id,
                                count: '1',
                            });
                            var row = {id : data.id,count : c2}
                            console.log(row);
                            client.broadcast.emit("allsend", row);
                        }else{
                            c2 = parseInt(doc['count']);
                            c2--;
                            db.collection('current_items').update({ id : doc['id'] },{ count : c2,id : doc['id'] });
                            var row = {id : data.id,count : c2}
                            console.log(row);
                            client.broadcast.emit("allreceive", row);
                        }
                    })
                    .catch(e => {
                    });
               }
               redisClient.publish('pageCounter', `Item has been visited`); //publishes a message to a channel
               redisClient.decr(client.handshake.query.itemId, (err, updatedValue) => { //redish take care of sync and return vlaue
                if (err) console.log(err);
                client.emit('liveV', updatedValue);
                //res.json({visit:updatedValue}) 
                //res.send(`Hello from instance: ${req.query.itemId}, ${updatedValue} Visits!!!`);
            });
        });
    
    });
})

server.listen(4200);