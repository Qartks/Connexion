module.exports = function (app) {

    var model = require('./models/model.server')();

    require("./services/user-serivce.server")(app, model);

}