var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db){

    app.post('/account/create', (req, res) =>{
        const credentials ={
            username : req.body.username,
            password : req.body.password,
            firebase : req.body.firebase
        };
        //Don't continue if nothing provided...
        if(credentials.username != null && credentials.password != null){
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

    app.get('/account/:username', (req, res) =>{
        const username = req.params.username;
        console.log("looking for "+username);
        const account ={
            'username' : username
        };
        db.collection('accounts').findOne(account, (err, result) =>{
            if(err){
                res.send({'error':'An Error Occured'});
            }else{
                res.send(result);
            }
        })
    });
}