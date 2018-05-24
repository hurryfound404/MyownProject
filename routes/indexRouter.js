/**
 * Created by Administrator on 2018/3/16.
 */


const express = require('express');
const userController = require('./../controller/userController.js');// 引用下一个模块post get方法
const upFile = require('./../controller/upFileController.js');
// const upFileIndex = require('./../controller/upFileIndexController.js');
const route = express.Router();//本来是myapp，但myapp是服务对象，在模块里不能再
//创建个，所以我们用express的Router这个类来代替，再暴露出去

route.get("/login.do",userController.userLogin);
route.post("/upFile.do", upFile.dataInput );
route.post("/upFileIndex.do", upFile.dataInputIndex);
route.get("/addProduct.do", userController.addProduct);
route.get("/addProductnew.do", userController.addProductnew);

// // 用户头像
// route.post('/upPic.do', userController.upUserPic);

//route.get("/register.do",userController.register);


//route.get("/studentlist.do",stuController.studentList);
//route.post("/studentdelete.do",stuController.studentDelete);
//route.get("/studentadd.do",stuController.studentAdd);
//route.get("/studentupdate.do",stuController.studentUpdate);
//route.get("/studentsearch.do",stuController.studentSearch);
//route.get("/studentcount.do",stuController.studentCount);

module.exports = route;//暴露  接口 //exports.indexRouter = route也可这样写，但外面多写一个indexRouter