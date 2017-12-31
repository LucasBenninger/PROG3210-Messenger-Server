var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db){

    app.get('/account/create', (req, res) =>{
        const credentials ={
            _id : req.body.username,
            password : req.body.password,
            firebase : req.body.firebase
        };
        //Don't continue if nothing provided...
        if(credentials._id != null && credentials.password != null){
            db.collection('accounts').insert(credentials, (err, result) =>{
                if(err){
                    res.send({'error':'An Error Occured'});
                }else{
                    res.send(result.ops[0]);
                }
            });
        }else{
            res.send({"error":"Username and password Cannot be Null"});
        }
    });
}