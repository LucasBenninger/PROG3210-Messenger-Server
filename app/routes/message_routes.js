var ObjectId = require('mongodb').ObjectID;

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
        db.collection('messages').insert(message, (err, result) =>{
            if(err){
                res.send({'error':'An Error Occured'});
            }else{
                res.send(result.ops[0]);
            }
        })
    });

};