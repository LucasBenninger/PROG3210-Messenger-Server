const messageRoutes = require('./message_routes');

module.exports = function(app, db){
    messageRoutes(app, db);
}