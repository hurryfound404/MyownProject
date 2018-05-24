/**
 * Created by Administrator on 2018/3/16.
 */


//1.引用框架
const myexpress = require("express");
const logger = require('morgan');  //HTTP请求日志中间件
const favicon = require("serve-favicon"); //icon设置模块
const cookieParser = require('cookie-parser'); //cookie操作中间件,用户获取用户输入的信息
const bodyParser = require("body-parser"); //把提交的数据封装到body-parser中，用于post方式
const indexRouter = require("./routes/indexRouter.js"); //模块化 引用文件，自己的加个./，indexRouter代表这个文件
const myejs = require("ejs");//应用ejs
// 甘坤
const userRouter = require('./routes/userRouter.js');
const viewRouter = require("./routes/viewRouter.js");
const myapp = myexpress(); //执行express中的全局函数，返回一个express的服务对象
const AV = require('leanengine');
AV.initialize("UpYIDJpeAXbQCnyjbXFMY2Xz-gzGzoHsz", "xdXrEjE0zJBc5Wa1ezwsqHoQ");
// 设置上传图片的大小
myapp.use(bodyParser.json({ limit: '5000mb' }));
myapp.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));

const mysession = require("express-session");

myapp.use(bodyParser.urlencoded({ extended: false })); //解析urlencoeded编码的post参数，URLEncoded编码中,所有的字符均为ANSCI


myapp.use(mysession({
    name:"testapp",//这里的name指的是cookice的name，默认cookie的name，connect.sid
    secret:"1234",
    cookie:{maxAge:8000000},
    rolling:true,//更新session-cookie失败的时间，默认值为false
    resave:true  //每次请求，重置时间
}));

myapp.use(userRouter);

myapp.use(viewRouter);
myapp.set("views",__dirname+"/view");//配置模板的路劲
myapp.engine("html",myejs.__express);//添加一个HTML引擎
myapp.set("view engine","html");//使用的引擎

myapp.use(logger('dev')); //日志设置
myapp.use(cookieParser()); //cookie设置
myapp.use(myexpress.static(__dirname + "/public")); //静态文件的路径配置
myapp.use('/public/images',myexpress.static("public/images")); //静态文件的路径配置
// cors 跨域
myapp.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

myapp.use(indexRouter);


//添加监听的端口号
myapp.listen("6888", function () {
    console.log("启动服务");
});