var ObjectId = require('mongodb').ObjectID;
const firebase = require('firebase-messaging');
var client = new firebase('AIzaSyBcvIAYSYfYg1bhaJTiH1YVooOxSTWIEPg');

module.exports = function(app, db){

    app.get('/message/:id', (req, res) =>{
        const id = req.params.id;
        const message ={
            '_id': new ObjectId(id)
        };
        db.collection('messages').findOne(message, (err, item) =>{
            if(err){
                res.send({'error':'An error Occured'});
            }else{
                res.send(item);
            }
        })
    });

    app.post('/message/send', (req, res) =>{
        const message = {
            sender:req.body.sender,
            receiver:req.body.receiver,
            content:req.body.content
        };

        var data = {
            title: message.sender,
            content: message.collection
        }
        db.collection('messages').insert(message, (err, result) =>{
            if(err){
                res.send({'error':'An Error Occured'});
            }else{
                db.collection('accounts').findOne({username:message.receiver}, (err, item) =>{
                    if(err){
                        console.log("Can't find username");
                    }else{
                        client.message(item.firebase, data);
                    }
                });
                res.send(result.ops[0]);
            }
        })
    });

};