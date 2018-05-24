/**
 * Created by Administrator on 2018/3/16.
 */


var userModal = require('./../modal/gk_userModal.js');
const AV = require('leanengine');


function Prlist (req, res) {
    let prosearch = req.session.prosearch;
    console.log(req.session.prosearch)
    let size = req.query.size;
    let current = req.query.current;
    userModal.Prlist(size, current, prosearch).then(function (data) {
        req.session.prosearch = '';
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    })
}

function Prsearch (req, res) {
    let Kind = req.body.Kind;
    let SHeight = req.body.SHeight;
    let SPrice = req.body.SPrice;
    console.log(req.body);
    userModal.Prsearch(Kind, SHeight, SPrice).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    })
}

function Prcount (req, res) {
    let prosearch = req.session.prosearch;
    userModal.Prcount(prosearch).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    })
}

function userSea (req, res) {
    let username = req.body.username;
    let pwd = req.body.pwd;
    let tell = req.body.tell;
    let yznum = req.body.yznum;
    AV.Cloud.verifySmsCode(yznum, tell).then(function () {
        res.send("ok");
        console.log("注册成功");
    }, function (err) {
        console.log(err);
        res.send("验证码错误")
    });
    userModal.userSea(username).then(function (data) {
        if (data.length == 0) {
            userModal.userAdd(username, pwd, tell).then(function (data) {
                // res.redirect('index.html');
                // res.render('index',{user:"gk001",datacar:"",data:"",datanew:""})
                let i = data.insertId;
                console.log(i);
                userModal.sU(i).then(function (data) {

                    req.session.user = data;
                    // res.send(data)
                    console.log(req.session.user);
                    res.send("success")
                });
                // console.log(data);
            })
        } else {
            res.send("nok")
        }
    }).catch(function (err) {
        console.log(err);
    })
}

function sendCode (req, res) {
    let tell = req.query.tell;
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: tell,
        name: "Ulife",
        op: "注册验证码",
        ttl: 5
    }).then(function () {
        res.send("发送成功")
    }, function (err) {
        console.log(err);
        res.send("发送失败")
    })
}

function Prcol (req, res) {
    let proid = req.body.proid;
    // let id=req.body.id;
    let id = req.session.user.user_id;
    console.log(id, req.session.user.user_id);
    userModal.Prcol(proid, id).then(function (data) {
        if (data.length == 0) {
            userModal.Prcol2(proid, id).then(function (data) {
                res.send(data)
            })
        }
    }).catch(function (err) {
        console.log(err);
    })
}


function navSearch (req, res) {
    // let prosearch = req.session.prosearch;
    req.session.prosearch = req.query.value
    res.send('ok')
}


function fashionList (req, res) {
    //console.log(userModal.fashionList);
    userModal.fashionList().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports = {
    Prlist,
    Prsearch,
    Prcount,
    userSea,
    sendCode,
    Prcol,
    navSearch,
    fashionList
};