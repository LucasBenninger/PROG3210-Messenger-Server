var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db){

    app.post('/account/create', (req, res) =>{
        console.log("Body:\n"+JSON.stringify(req.body));
        const credentials ={
            'username' : req.body.username,
            'password' : req.body.password,
            'firebase' : req.body.firebase
        };
        console.log("Received Account Creation Request of:\n"+JSON.stringify(credentials));
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
            res.send({"error":"Username and password Cannot be Null: "+credentials.username+" : "+credentials.password});
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