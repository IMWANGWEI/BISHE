var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var User = new Schema({ 
    username : String,
    password : String,
    meta: {
    updateAt: {type:Date, default: Date.now()},
    createAt: {type:Date, default: Date.now()}
    }
});
// export them 
exports.User = mongoose.model('User', User);
