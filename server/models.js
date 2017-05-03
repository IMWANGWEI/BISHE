var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
//用户表
var User = new Schema({
    username: String,
    password: String,
    userimg:String,
    meta: {
        updateAt: { type: Date, default: Date.now() },
        createAt: { type: Date, default: Date.now() }
    }
});


//好友表
// var friendSchema = new Schema({
//     uid: {type:String, ref: 'User'},
//     fid: {type:String, ref: 'User'},
//     meta: {
//         updateAt: {type:Date, default: Date.now()},
//         createAt: {type:Date, default: Date.now()}
//     }
// });

// // 聊天信息表
// var messageSchema = new Schema({
//     from: {type:String, ref: 'User'},
//     to: {type:String, ref: 'User'},
//     content: String,
//     status: String,
//     meta: {
//         updateAt: {type:Date, default: Date.now()},
//         createAt: {type:Date, default: Date.now()}
//     }
// });
// export them 
exports.User = mongoose.model('User', User);
