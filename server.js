const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbURL = require('./config/db');


var admin = require("firebase-admin");

var serviceAccount = require("./config/prog3210-messenger-firebase-adminsdk-hpi6d-af8adea128.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prog3210-messenger.firebaseio.com"
});


const app = express();
app.use(bodyParser.json({extended : true}));
const port = 8000;

app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(dbURL.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database.db('messenger'));
  
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })