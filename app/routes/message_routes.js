var ObjectId = require('mongodb').ObjectID;

var admin = require("firebase-admin");

var serviceAccount = require("../../config/prog3210-messenger-firebase-adminsdk-hpi6d-af8adea128.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://prog3210-messenger.firebaseio.com"
});

module.exports = function (app, db) {

    app.get('/message/:id', (req, res) => {
        const id = req.params.id;
        const message = {
            '_id': new ObjectId(id)
        };
        db.collection('messages').findOne(message, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error Occured' });
            } else {
                res.send(item);
            }
        })
    });

    app.get('/message/get/:receiver', (req, res) => {
        const receiver = req.params.receiver;
        const message = {
            'receiver': receiver
        };
        db.collection('messages').find(message).toArray(function (error, messages) {
            if (error) {
                res.send({ 'error': 'An error occured' });
            } else {
                res.send(messages);
            }
        });
    });

    app.post('/message/send', (req, res) => {
        const message = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            content: req.body.content
        };
        db.collection('messages').insert(message, (err, result) => {
            if (err) {
                res.send({ 'error': 'An Error Occured' });
            } else {
                db.collection('accounts').findOne({ username: message.receiver }, (err, item) => {
                    if (err) {
                        console.log("Can't find username");
                    } else {
                        if (item) {
                            //Send Notification
                            var registrationToken = item.firebase;
                            var payload = {
                                notification: {
                                    title: message.sender,
                                    body: message.content
                                }
                            };

                            admin.messaging().sendToDevice(registrationToken, payload)
                                .then(function (response) {
                                    // See the MessagingDevicesResponse reference documentation for
                                    // the contents of response.
                                    console.log("Successfully sent message:", response);
                                })
                                .catch(function (error) {
                                    console.log("Error sending message:", error);
                                });
                        }
                    }
                });
                res.send(result.ops[0]);
            }
        })
    });

};