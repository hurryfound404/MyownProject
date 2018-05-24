


const pool = require("../modal/sqlPool.js"); //连接池模块

function Prlist (size, current, prosearch) {
    return new Promise(function (resolve, reject) {
        let start = (current - 1) * size;
        let arr = [start, parseInt(size)];
        let sql = '';
        if (prosearch && prosearch!=='') sql = `select * from productInfo where pro_state=1 and pro_name like '%${prosearch}%' limit ?,?`;
        else sql = `select * from productInfo where pro_state=1 limit ?,?`
        pool.query(sql, arr).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err)
        });
    })
}

function Prsearch (Kind, SHeight, SPrice) {
    return new Promise(function (resolve, reject) {
        let sql = 'select * from productInfo where pro_state=1 ';
        let arr = [];
        if (Kind != 'undefined') {
            if (Kind == "office")
                sql += " and pro_type_id = 2";
            if (Kind == "女王范")
                sql += " and pro_type_id = 1";
            if (Kind == "婚鞋")
                sql += " and pro_type_id = 3";
            arr.push(Kind)
        }
        if (SHeight != 'undefined') {
            if (SHeight == "10cm以下")
                sql += " and pro_genhigh<=10";
            if (SHeight == "10cm以上")
                sql += " and pro_genhigh>10";
            arr.push(SHeight)
        }
        if (SPrice != 'undefined') {
            if (SPrice == "从高到低")
                sql += "  order by pro_new_price DESC";
            if (SPrice == "从低到高")
                sql += "  order by pro_new_price";
            arr.push(SPrice)
        }
        pool.query(sql, arr).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err)
        })
    })
}

function Prcount (prosearch) {
    return new Promise(function (resolve, reject) {
        let sql = '';
        if (prosearch && prosearch !== '') sql = `select count(*) as num from productInfo where pro_state=1 and pro_name like '%${prosearch}%'`;
        else sql = `select count(*) as num from productInfo where pro_state=1`
        pool.query(sql, [null]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })
}

function userSea (username) {
    return new Promise(function (resolve, reject) {
        let sql = 'select * from user where user_loginName = ?';
        pool.query(sql, [username]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })
}

function userAdd (username, pwd, tell) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO user(user_loginName,user_pwd,user_tel) VALUES(?,?,?)";
        pool.query(sql, [username, pwd, tell]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })
}

function Prcol (proid, id) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from collection where pro_id=? and user_id=?";
        pool.query(sql, [proid, id]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })
}

function Prcol2 (proid, id) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO collection(pro_id,user_id) VALUES(?,?)";
        pool.query(sql, [proid, id]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })
}

function sU (i) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from user where user_id=?";
        pool.query(sql, [i]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })
}

function fashionList () {
    return new Promise(function (resolve, reject) {
        let sql = "select * from commendImg";
        pool.query(sql).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            reject(err);
            console.log(err);
        });
    })
}
module.exports = {
    Prlist,
    Prsearch,
    Prcount,
    userSea,
    userAdd,
    Prcol,
    Prcol2,
    sU,
    fashionList
};