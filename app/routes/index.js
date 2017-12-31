const messageRoutes = require('./message_routes');
const accountRoutes = require('./account_routes');

module.exports = function(app, db){
    messageRoutes(app, db);
    accountRoutes(app, db);
}