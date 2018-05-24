/**
 * Created by Administrator on 2018/4/4.
 */


const mysql = require('promise-mysql');
//注：这里使用的不是mysql,而是promise-mysql
// 主要与mysql的区别是，使用promise的方式，来使用，而不是以前的回调函数的试了
// promise-mysql 的基本使用方法，参考本文件的最后代码段
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hurry123456',
    database: 'ulife',
    connectionLimit: 10 // 设置最大的连接数
});
module.exports=pool;



// 连接池的使用方法
//pool = mysql.createPool({
//    host: 'localhost',
//    user: 'sauron',
//    password: 'theonetruering',
//    database: 'mordor',
//    connectionLimit: 10
//});
// 在promise-mysql 中，有了pool对象后，通以下的方式来执行mysql语句
//pool.query('select `name` from hobbits').then(function(rows){
//    // Logs out a list of hobbits
//    console.log(rows);
//});



//const mysql = require("mysql");
//module.exports.sqlpool = function () {
//    let pool = {
//        config:{
//            host:"localhost",
//            user:"root",
//            password:"root",
//            port:3306,
//            database:"ulife"
//        },
//        connect: function (sql,arr,fn) {
//            //创建链接池对象
//            const pool= mysql.createPool(this.config);
//            //获取链接池对象
//            pool.getConnection(function (err,connect) {
//                if(err){
//                    console.log(err);
//                }else{
//                    //console.log(111);
//                    connect.query(sql,arr,fn);
//                }
//            });
//        }
//    }
//    return pool;
//}