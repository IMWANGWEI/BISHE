var express = require('express')
var router = express.Router()
var models = require('./models')

var User = models.User;
var Room = models.Room;



router.get('/', function (req, res) {
    res.send('Hello World')
});



// 测试session
// router.get('/session', function (req, res, next) {
//     var sess = req.session
//     if (sess.views) {
//         sess.views++
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<p>views: ' + sess.views + '</p>')
//         res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
//         res.end()
//     } else {
//         sess.views = 1
//         res.end('welcome to the session demo. refresh!')
//     }
// });

router.get('/session',function(req,res){
    console.log(req.session)
    res.json({
        session:req.session
    })
})



// 注册写入数据库
router.post('/signUp', function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        userimg: req.body.userimg
    });
    User.findOne({ "username": user.username }, function (err, doc) {
        if (err) {
            res.json({
                result: 'FAIL',
                err: err
            });
        } else if (doc !== null) {
            res.json({
                result: 'FAIL',
                msg: 'user already exist!'
            });
        } else if (doc === null) {
            user.save();
            res.json({
                result: 'SUCCESS'
            });
        }
    });
});


//登陆
router.post('/signIn', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({"username":username}).populate(['rooms','friends']).exec(function(err,doc){
        if (doc == null) {
            res.json({
                result: 'FAIL',
                msg: 'user not exist!',
                session: req.session
            });
        } else if (doc.password != password) {
            res.json({
                result: 'FAIL',
                msg: 'uncorrect password!',
                session: req.session
            });
        } else {
            req.session.user = doc;
            res.json({
                result: 'SUCCESS',
                session: req.session

            });
            req.session.save();
            // var data = User.findOne({"username":username}).populate(['rooms','friends']).exec(function(err,res){
            //     console.log(res)
            // });
            // User.findOne({"uid":req.session.user._uid}).populate('rooms').exec(function(err,res){
            //     console.log(res)
            // });
        }
    });
});

//登出
router.get('/signOut', function (req, res) {
    if (!req.session.user) {
        res.json({
            result: 'FAIL',
            msg: 'user havent sign in!',
            session: req.session.user
        });
    } else if (req.session.user) {
        req.session.user = null;
        res.json({
            result: 'SUCCESS',
            msg: 'sign out success',
            session: req.session.user
        })
    } else {
        res.json({
            result: 'FAIL',
            msg: 'unknown error'
        })
    }
});


// 获得用户信息
router.post('/getUser',function(req,res){
    User.findById(req.body.uid).populate(['rooms','friends']).exec(function(err,doc){
        console.log(doc)
        if(doc){
            res.json(doc)
        }
    })
})

// 用户名查询

router.post('/searchUser', function (req, res) {
    User.findOne({ "username": req.body.username }, function (err, doc) {
        if (err) {
            res.json({
                result: 'FAIL',
                err: err
            });
        } else if (doc !== null) {
            res.json({
                result: 'SUCCESS',
                data: doc
            });
        } else if (doc === null) {
            res.json({
                result: 'FAIL',
                msg: 'user not exist'
            });
        }
    });
});


//创建聊天室
router.post('/createRoom', function (req, res) {
    var uid = req.body.uid;
    var room = new Room({
        roomName: req.body.roomName,
    });
    Room.findOne({ "roomName": room.roomName }, function (err, doc) {
        if (err) {
            res.json({
                result: 'FAIL',
                err: err
            });
        } else if (doc != null) {
            res.json({
                result: 'FAIL',
                msg: "this room already exist!"
            });
        } else if (doc == null) {
            room.roomMember.push(uid);
            room.save();
            res.json({
                result: 'SUCCESS',
                data: room
            });
            User.findById(uid, function (err, user) {
                user.rooms.push(room._id);
                user.save();
            });
        }
    });

    // room.save((err, doc)=>{
    //     res.json({
    //         data:doc
    //     });
    // });

});


//搜索聊天室
router.post('/searchRoom',function(req,res){
    var roomName = req.body.roomName;
    Room.findOne({"roomName":roomName}, function(err, room){
        if(err){
            res.json({
                result:'FAIL',
                err:'unknown error'
            })
        }else if(room == null){
            res.json({
                result:'FAIL',
                msg:'room not exist'
            })
        }else if(room != null){
            res.json({
                result:'SUCCESS',
                room:room
            });
        }
    });
});

//加入聊天室
router.post('/inRoom', function (req, res) {
    var uid = req.body.uid,
        rid = req.body.rid;
    //是否已加入
    User.findById(uid, function (err, user) {
        User.findOne({ "_id": uid, "rooms": rid }, function (err, doc) {
            if (err) {
                res.json({
                    result: "FAIL",
                    msg: "unknown error !"
                });
            } else if (doc != null) {
                res.json({
                    result: "FAIL",
                    msg: "you in this room!"
                });
            } else if (doc == null) {
                user.rooms.push(rid);
                user.save();
                res.json({
                    result: 'SUCCESS',
                    data: user
                })
                Room.findById(rid,function (err, room) {
                    if (err) {
                        console.log(err);
                    } else {
                        room.roomMember.push(uid);
                        room.save();
                    }
                });
            }
        })
    })
});

//退出聊天室
router.post('/outRoom', function(req,res){
    var uid = req.body.uid,
        rid = req.body.rid;
    User.findById(uid, function(err, user){
        user.rooms.pull(rid);
        user.save();
        res.json({
            result:'SUCCESS',
            data:user
        })
    });
    Room.findById(rid, function(err,room){
        room.roomMember.pull(uid);
        room.save();
    });
});


//添加好友
router.post('/addFriend', function (req, res) {
    // var friend = new Friend({
    //     uid : req.body.uid,
    //     fid : req.body.fid
    // });
    /////////////////////////
    // Friend.findOne({"uid":req.body.uid,"fid":req.body.fid}).populate('uid').exec(function(err,res){
    //     console.log(res);
    // })////////////////////////populate用法
    //////////////////////////////////////////////////添加了好友测试
    // User.findById(req.body.fid,function(err,doc){
    //     var user = doc;
    //     user.friends.push(req.body.uid);
    //     user.save();
    //     console.log(user);
    // })
    var uid = req.body.uid,
        fid = req.body.fid;
    // 查找是否有这个好友
    User.findById(uid, function (err, user) {
        User.findOne({ "_id": uid, "friends": fid }, function (err, doc) {
            console.log(doc);
            if (err) {
                res.json({
                    result: "FAIL",
                    msg: "unknown error !"
                });
            } else if (doc != null) {
                res.json({
                    result: "FAIL",
                    msg: "you had added this friend!"
                });
            } else if (doc == null) {
                user.friends.push(fid);
                user.save();
                res.json({
                    result: "SUCCESS",
                    data: user
                });
                User.findById(fid, function (err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        user.friends.push(uid);
                        user.save();
                    }
                });
            }
        });
    });



});


//删除好友
router.post('/dropFriend', function (req, res) {
    var uid = req.body.uid,
        fid = req.body.fid;
    User.findById(uid, function (err, user) {
        User.findOne({ "_id": uid, "friends": fid }, function (err, doc) {
            if (err) {
                res.json({
                    result: "FAIL",
                    msg: "unknown error !"
                });
            } else if (doc == null) {
                res.json({
                    result: "FAIL",
                    msg: "you havent dropped this friend!"
                });
            } else if (doc != null) {
                user.friends.pull(fid);
                user.save();
                res.json({
                    result: "SUCCESS",
                    data: user
                });
            }
        });
    });
    User.findById(fid, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            user.friends.pull(uid);
            user.save();
        }
    });
});


// 所有用户
router.get('/allUsers', function (req, res) {
    User.find({}, function (err, docs) {
        res.json({
            result: 'SUCCESS',
            data: docs
        });
    });
});


module.exports = router