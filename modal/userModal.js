/**
 * Created by Administrator on 2018/3/16.
 */


    const pool = require("../modal/sqlPool.js"); //连接池模块


    function userLogin(name,pwd) {
        return new Promise(function (resolve, reject) {
            let sql = "select * from user where user_loginName=? and user_pwd=?";
            pool.query(sql,[name,pwd]).then(function(data){
                let result;
                if(data.length>0){
                    result =1;
                }else {
                    result = 0;
                }
                resolve({code:result,data:data[0]});
            }).catch(function(err){
                reject(err);
            });
        })
        };

    function userindex(){
        return new Promise(function (resolve, reject) {
            let sql = "select * from indeximg";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    function userindexNew(){
        return new Promise(function (resolve, reject) {
            let sql = "select * from indexNewImg";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //导航购物车
    function userCar(userid) {
        return new Promise(function (resolve, reject) {
            let sql = "SELECT *,(SELECT pro_img_goods FROM productInfo WHERE pro_id = s1.pro_id )AS prourl"+
                ",(SELECT pro_name FROM productInfo WHERE pro_id = s1.pro_id )AS proname FROM shoppingCar AS s1 WHERE user_id=?"
            pool.query(sql,[userid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
        };

    //导航购物车删除
    function usercardelete(myid){
        return new Promise(function (resolve, reject) {
            let sql = "delete from shoppingCar where sc_id="+myid[0];
            for(var i=1;i<myid.length;i++){
                sql+=" or sc_id="+myid[i];
            };
            console.log(sql);
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };

    //商品详情图片加载1
    function productInfo(proid){
        return new Promise(function (resolve, reject) {
            let sql = "select * from productInfo where pro_id=?";
            pool.query(sql,[proid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //支付成功查询商品类型
    function getgoodstypeOrder(scdata){
        return new Promise(function (resolve, reject) {
            let sql = "select distinct pro_type_id from productInfo where pro_id="+scdata[0];
            for(var i=1;i<scdata.length;i++){
                sql +=" or pro_id="+scdata[i];
            }
            //console.log(sql);
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    // 购物车商品推荐
    function getshoppingcarTuiJian () {
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM productInfo ORDER BY pro_sales DESC limit 0,5";
            pool.query(sql, []).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        }); 
    }
    //支付成功商品推荐
    function getsuccessgoods(typedata){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM productInfo WHERE pro_type_id="+typedata[0].pro_type_id;
            for(var i=1;i<typedata.length;i++){
                sql +=" or pro_type_id="+typedata[i].pro_type_id;
            }
            sql +=" ORDER BY pro_sales DESC limit 0,5";
            //console.log(sql);
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    }
    //商品类型查询
    function proType(protype){
        return new Promise(function (resolve, reject) {
            let sql = "select * from productType where pro_type_id=?";
            pool.query(sql,[protype]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //商品规格查询 查询颜色
    function productguige(proid){
        return new Promise(function (resolve, reject) {
            let sql = "select * from productguige where pro_id=? GROUP BY progg_color";
            pool.query(sql,[proid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //根据颜色查商品规格数据
    function productguigeColor(proid,color){
        return new Promise(function (resolve, reject) {
            let sql = "select * from productguige where pro_id=? and progg_color=?";
            pool.query(sql,[proid,color]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //商品详情添加购物车
    function addUserSCar(proid,color,size,userid,num,price){
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO shoppingCar() VALUES(NULL,?,?,?,?,?,?)";
            pool.query(sql,[proid,color,size,userid,num,price]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //购物车改变商品数量
    function changeGoodsNum(num,goodsid){
        return new Promise(function (resolve, reject) {
            let sql = "update shoppingCar set sc_amount=? where sc_id=?";
            pool.query(sql,[num,goodsid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //购物车获取相关推荐
    function getrecommendation(protype){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM productInfo WHERE pro_type_id=? ORDER BY pro_sales DESC limit 0,5";
            pool.query(sql,[protype]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };

    //购物车去订单
    function goAccountbar(scdata){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT *,(SELECT pro_img_goods FROM productInfo WHERE pro_id = s1.pro_id )AS prourl"+
                ",(SELECT pro_name FROM productInfo WHERE pro_id = s1.pro_id )AS proname FROM shoppingCar AS s1 "+
                "WHERE sc_id="+scdata[0];
            for(var i=1;i<scdata.length;i++){
                sql+=" or sc_id="+scdata[i];
            };
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //订单页用户地址
    function userAddress(userid){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM address WHERE user_id=? ORDER BY addr_default DESC";
            pool.query(sql,[userid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //订单包装盒
    function pack(){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM packImg ORDER BY pack_default DESC";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //订单优惠券
    function coupon(userid){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM coupon where user_id=? and coupon_state=1";
            pool.query(sql,[userid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //订单加地址
    function newaddress(userid,newaddr){
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO address() VALUES(NULL,?,?,?,?,?,?,?,null,0)";
            pool.query(sql,[userid,newaddr.sf,newaddr.city,newaddr.carea,newaddr.detail,newaddr.name,newaddr.tell]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //订单页面获取单一地址
    function getaddr(addrid){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM address WHERE addr_id=?";
            pool.query(sql,[addrid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    }
    //订单更新地址
    function updataUserAddress(addrid){
        return new Promise(function (resolve, reject) {
            let sql = "update address set addr_pro=?,addr_city=?,addr_area=?,addr_detail=?,addr_sh_user=?,addr_sh_tel=? where addr_id=?";
            pool.query(sql,[addrid.sf,addrid.city,addrid.carea,addrid.detail,addrid.name,addrid.tell,addrid.bjaddrid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //订单修改默认地址
    function defaultAddress1(userid){
        return new Promise(function (resolve, reject) {
            let sql = "update address set addr_default=0 where user_id=? and addr_default=1";
            pool.query(sql,[userid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    function defaultAddress2(gaddrid){
        return new Promise(function (resolve, reject) {
            let sql = "update address set addr_default=1 where addr_id=?";
            pool.query(sql,[gaddrid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //添加订单
    function addorder(userid,tjdata){
        tjdata.bh = userid+tjdata.choosePackid+tjdata.chooseCouponid+tjdata.chooseAddressid+tjdata.bh;
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO orderly() VALUES(null,?,?,?,?,?,?,'快递运输',?,?,?,0,0,?,?)";
            pool.query(sql,[tjdata.bh,userid,tjdata.choosePackid,tjdata.chooseCouponid,tjdata.chooseAddressid,tjdata.time,tjdata.paytype,tjdata.bill,tjdata.remark,tjdata.allprice,tjdata.allnum]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //添加订单商品
    function addordergoods(orderid,data){
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO orderDetail() VALUES";
            for(var i=0;i<data.length;i++){
                sql+= "(null,"+orderid+","+data[i].pro_id+",'"+data[i].progg_color+"',"+data[i].progg_size+","+data[i].sc_amount+","+data[i].pro_price+"),"
            }
            sql = sql.substring(0,sql.length-1);
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //提交订单删除优惠券
    function deletecoupon(tjdata){
        return new Promise(function (resolve, reject) {
            let sql = "delete from coupon where coupon_id=?";
            pool.query(sql,[tjdata.chooseCouponid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    };
    //获取订单
    function getorder(orderid){
        return new Promise(function (resolve, reject) {
            let sql = "select * from orderly where order_id=?";
            pool.query(sql,[orderid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    //查询购物车是否有想加商品
    function searchusercar(proid,userid,color,size){
        return new Promise(function (resolve, reject) {
            let sql = "select * from shoppingCar where pro_id=? and user_id=? and progg_color=? and progg_size=?";
            pool.query(sql,[proid,userid,color,size]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    };
    // 改变已有商品数量
    function changeNumUserSCar(num,proid,userid,color,size){
        return new Promise(function (resolve, reject) {
            let sql = "update shoppingCar set sc_amount=sc_amount+? where pro_id=? and user_id=? and progg_color=? and progg_size=?";
            pool.query(sql,[num,proid,userid,color,size]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    }
    //支付成功
    function orderpaysuccess(orderid){
        return new Promise(function (resolve, reject) {
            let sql = "update orderly set order_pay=1 where order_id=?";
            pool.query(sql,[orderid]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
    }
    // 上传图片 添加商品
    // 添加商品
function addProduct (dataObj) {
    return new Promise((resolve, reject) => {
        let sql = `insert into productInfo() values(null,${dataObj.pro_type_id},'${dataObj.pro_name}',${dataObj.pro_new_price},${dataObj.pro_new_price},'${dataObj.upFileData[0]}','${dataObj.upFileData[1]}','${dataObj.pro_origin}','${dataObj.pro_genhigh}','${dataObj.pro_genxing}','${dataObj.pro_liliao}','${dataObj.pro_xiemian}','${dataObj.pro_xiedimian}',1,'${dataObj.pro_info}',null,0,null,1)`;
        console.log(sql)
        pool.query(sql, []).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

function addProductGg (addproId, dataObj, imgData) {
    return new Promise((resolve, reject) => {
        let colorArr = [];
        let sizeArr = [];
        let imgStr = '';
        colorArr = dataObj.pro_color.split(';');
        sizeArr = dataObj.pro_size.split(';');
        // sizeArr.forEach(ele => {
        //     ele = ele.split(',');
        // });
        for (let i = 0; i < sizeArr.length;i++){
            sizeArr[i]=sizeArr[i].split(',')
        }
        imgStr = imgData.join(';')
        console.log(colorArr, sizeArr, imgStr);
        let sql = ``;
        colorArr.forEach((ele,i) => {
            sizeArr[i].forEach(ele1 => {
                sql += `(null,${addproId},998,'${ele}',${ele1},'${imgStr}'),`
            })
        });
        sql = `insert into productguige() values`+sql;
        sql = sql.substr(0, sql.length - 1);
        console.log(sql)
        pool.query(sql, []).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

function hasProduct (dataObj) {
    return new Promise((resolve, reject) => {
        let sql = `select * from productInfo where pro_type_id=${dataObj.pro_type_id}
         and pro_name='${dataObj.pro_name}'`;
        // console.log(sql)
        pool.query(sql, []).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}
function addgk (dataObj, id, imgStr) {
    return new Promise((resolve, reject) => {
        sql = `insert into productguige() values(null,${id},998,'${dataObj.pro_color}',${dataObj.pro_size},'${imgStr}')`;
        console.log(sql)
        pool.query(sql, []).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

//庄宇 个人中心
// 个人中心
// 购物车
function userCenterCar (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT *,(SELECT pro_img_goods FROM productInfo WHERE pro_id = s1.pro_id )AS carImgs" +
            ",(SELECT pro_name FROM productInfo WHERE pro_id = s1.pro_id )AS carName FROM shoppingCar AS s1 WHERE user_id=?"
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
}
// 个人中心订单渲染--查找订单所有信息
function userSelectOrder (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from orderly where user_id=?";
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
}
// 个人中心查找订单商品信息表（orderDetail）信息
function SelectOrderDetail (orderId) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from orderdetail where order_id=" + orderId[0];
        for (let i = 0; i < orderId.length; i++) {
            sql += " or order_id=" + orderId[i];
        }
        console.log(sql);
        pool.query(sql, []).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
}
// 个人中心查找商品具体信息表信息
function SelectProInfo (proId) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from productinfo where pro_id=" + proId[0];
        for (let i = 0; i < proId.length; i++) {
            sql += " or pro_id=" + proId[i];
        }
        console.log(sql);
        pool.query(sql, []).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 地址管理
function userCenterAdress (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM address WHERE user_id=? ORDER BY addr_default DESC";
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    });
}
// 个人中心优惠券
function userCoupon (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM coupon where user_id=?";
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    });
}
// 个人中心收藏页面动态渲染
function userlikeid (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "select pro_id from collection where user_id=?";
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 个人中心查找用户收藏的商品
function userlikeidSelect (likeProid) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from productInfo where ";
        if (likeProid.length > 0) {
            sql += "pro_id= ? "
        }
        for (let i = 0; i < likeProid.length - 1; i++) {
            sql += " or pro_id= ? "
        }
        console.log(likeProid.length);
        console.log(sql);
        pool.query(sql, likeProid).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 个人中心查找个人收藏表ID
function userCollectionInfo (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "select col_id from collection where user_id=?";
        pool.query(sql, userid).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 个人中心查找用户收货地址
function userAdressInfo (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "select * from address where user_id=?";
        pool.query(sql, userid).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 个人中心动态显示头像和显示个人信息
function userPrint (userid) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM user where user_id=?";
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
}
// 个人中心添加收货地址
function addAdressDate (userid, userProlice, usersCity, usersAare, addUserDetil, userAdressName, userPhones) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO address() VALUES(NULL,?,?,?,?,?,?,?,'2018-1-1','0')";
        pool.query(sql, [userid, userProlice, usersCity, usersAare, addUserDetil, userAdressName, userPhones]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        })

    })

}
// 个人中心删除收藏的商品
function userColDelete (colId) {
    return new Promise(function (resolve, reject) {
        let sql = "delete from collection where col_id= " + colId[0];
        // for(let i=1;i<colId.length;i++){
        //     sql+=" or sc_id="+colId[i];
        // };
        console.log(sql);
        pool.query(sql, []).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })


}
// 个人中心修改密码
function updateUserPwd (userid, newPwd) {
    return new Promise(function (resolve, reject) {
        let sql = "UPDATE USER SET user_pwd=" + newPwd + " WHERE user_id= ?";
        // console.log(sql);
        pool.query(sql, [userid, newPwd]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 个人中心修改个人信息
function updateUser (alertUserName, editLoginName, alertUserSex, alertPhone, alertMail, userid) {
    return new Promise(function (resolve, reject) {
        let sql = `UPDATE user SET user_name='${alertUserName}',user_loginName='${editLoginName}',user_sex=${alertUserSex},user_tel='${alertPhone}',user_email= '${alertMail}' WHERE user_id= ${userid} `;
        // let sql=`update user set user_state=${zt} where user_id=${us}`;
        console.log(sql);
        pool.query(sql, []).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 个人中心修改收货地址
function eidtUserAddress (editAddressId, editName, editNumber, editProvince, editCitys, editArea, editDetil) {
    return new Promise(function (resolve, reject) {
        let sql = `UPDATE address SET addr_sh_user='${editName}',addr_sh_tel=${editNumber},addr_pro='${editProvince}',addr_city= '${editCitys}',addr_area= '${editArea}',addr_detail= '${editDetil}' WHERE addr_id= ${editAddressId} `;
        // let sql=`update user set user_state=${zt} where user_id=${us}`;
        console.log(sql);
        pool.query(sql, []).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })
}
// 个人中心购物车删除批量删除
function shopCdel (scid) {
    return new Promise(function (resolve, reject) {
        let sql = "delete from shoppingcar where sc_id=?";
        console.log(sql);
        pool.query(sql, [scid]).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            console.log(err);
        })
    })
}
// 批量删除
function shopCdelA (list) {
    return new Promise(function (resolve, reject) {
        console.log(list.length);
        let sql = "delete from shoppingcar where sc_id=" + list[0];
        for (var i = 1; i < list.length; i++) {
            sql += " or sc_id=" + list[i]
        }
        // let sql="delete from shoppingcar where 1=1 and sc_id=?";
        console.log(sql);
        pool.query(sql, []).then(function (data) {
            resolve(data)
        }).catch(function (err) {
            console.log(err);
        })
    })
}
// 上传头像保存头像路径到user表
function SaveUserImg (userid, filename) {
    return new Promise(function (resolve, reject) {
        let sql = "UPDATE USER SET user_pic='" + filename + "' WHERE user_id= ?";
        console.log(sql);
        pool.query(sql, [userid]).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            reject(err);
        });
    })

}


    module.exports={
        userLogin,
        userindex,
        userindexNew,
        userCar,
        usercardelete,
        productInfo,
        proType,
        productguige,
        productguigeColor,
        addUserSCar,
        changeGoodsNum,
        goAccountbar,
        userAddress,
        pack,
        coupon,
        newaddress,
        getaddr,
        updataUserAddress,
        defaultAddress1,
        defaultAddress2,
        addorder,
        addordergoods,
        deletecoupon,
        getorder,
        getrecommendation,
        searchusercar,
        changeNumUserSCar,
        getgoodstypeOrder,
        getsuccessgoods,
        orderpaysuccess,
        getshoppingcarTuiJian,
        addProduct,
        addProductGg,
        hasProduct,
        addgk,
        // -----
        userCenterCar,
        userCenterAdress,
        userCoupon,
        userPrint,
        addAdressDate,
        userlikeid,
        userlikeidSelect,
        userCollectionInfo,
        userColDelete,
        updateUserPwd,
        userAdressInfo,
        updateUser,
        eidtUserAddress,
        userSelectOrder,
        SelectOrderDetail,
        SelectProInfo,
        shopCdel,
        shopCdelA,
        SaveUserImg
    }
