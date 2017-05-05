var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
//用户表
var User = new Schema({
    username: String,
    password: String,
    userimg:String,
    friends:[{type:Schema.Types.ObjectId, ref: 'User'}],
    rooms:[{type:Schema.Types.ObjectId, ref:'Room'}],
    meta: {
        updateAt: { type: Date, default: Date.now() },
        createAt: { type: Date, default: Date.now() }
    }
});


// 好友表
// var Friend = new Schema({
//     uid: {type:Schema.Types.ObjectId, ref: 'User'},
//     fid: {type:Schema.Types.ObjectId, ref: 'User'},
//     meta: {
//         updateAt: {type:Date, default: Date.now()},
//         createAt: {type:Date, default: Date.now()}
//     }
// })

//聊天室表
var Room = new Schema({
    roomName : String,
    roomMember:[{
        type:Schema.Types.ObjectId , ref:'User'
    }]
});

//好友添加通知表
// var Inform = new Schema({
//     from: {type:Schema.Types.ObjectId, ref: 'User'},
//     to: {type:Schema.Types.ObjectId, ref: 'User'},
//     status: String,
//     meta: {
//         updateAt: {type:Date, default: Date.now()},
//         createAt: {type:Date, default: Date.now()}
//     }
// });

// 聊天信息表
// var Message = new Schema({
//     from: {type:Schema.Types.ObjectId, ref: 'User'},
//     to: {type:Schema.Types.ObjectId, ref: 'User'},
//     content: String,
//     status: String,
//     meta: {
//         updateAt: {type:Date, default: Date.now()},
//         createAt: {type:Date, default: Date.now()}
//     }
// });
// export them 

exports.User = mongoose.model('User', User);
exports.Room = mongoose.model('Room', Room);
// exports.Friend = mongoose.model('Friend', Friend);
// exports.Message = mongoose.model('Message',Message);
// exports.Inform = mongoose.model('Inform',Inform);

