/**
 * Created by Administrator on 2018/3/16.
 */


    var userModal = require('./../modal/userModal.js');
   
    //登录
    function userLogin(req, res){
        let name = req.query.username;
        let pwd = req.query.password;
        userModal.userLogin(name,pwd).then(function (data) {
            if(data.code == 1){
                console.log(data.data)
                req.session.user = data.data;
                res.send("ok");
                // res.redirect("index.html");//直接跳转页面  不是渲染
            }else{
                res.send("false");
            }
        })
    }
    //退出
    function ejsExit(req,res) {
        req.session.destroy();
        res.redirect("index.html");//直接跳转页面  不是渲染
    }
    //首页
    function ejsIndex(req,res) {
        var lyy;
        var data11;
        userModal.userindex().then(function (data) {
            lyy = data;
            return userModal.userindexNew();
        }).then(function (data) {
            data11 = data;
            if(req.session.user){
                let userid = req.session.user.user_id;
                return userModal.userCar(userid).then(function (data) {
                    if(data.length>0){
                        res.render("index",{data:lyy,datanew:data11,datacar:data,user:req.session.user});
                    }else{
                        if (Array.isArray(req.session.user)) {
                            res.render("index", { data: lyy, datanew: data11, datacar: "", user: req.session.user[0] });
                        } else {
                            res.render("index", { data: lyy, datanew: data11, datacar: "", user: req.session.user });
                        }
                    }
                })
            }else{
                res.render("index",{data:lyy,datanew:data11,datacar:"",user:""});
            }
        }).catch(function (err) {
            res.send(err);
        });
    }
    // 定制
function ejscustomization (req, res) {
    if (req.session.user) {
        let userid = req.session.user.user_id;
        userModal.userCar(userid).then(function (data) {
            if (data.length > 0) {
                res.render("customization", { datacar: data, user: req.session.user });
            } else {
                if (Array.isArray(req.session.user)) {
                    res.render("customization", { datacar: "", user: req.session.user[0] });
                } else {
                    res.render("customization", { datacar: "", user: req.session.user });
                }
            }
        })
    } else {
        res.render("customization", { datacar: "", "user": "" });
    }
}
    //关于我们
    function ejsAboutUs(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("AboutUs",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("AboutUs", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("AboutUs", { datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            res.render("AboutUs",{datacar:"","user":""});
        }
    }
    //时尚搭配
    function ejsElegantCollocation(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("ElegantCollocation",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("ElegantCollocation", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("ElegantCollocation", { datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            res.render("ElegantCollocation",{datacar:"","user":""});
        }
    }
    //产品分类
    function ejsproduct(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("product",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("product", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("product", { datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            res.render("product",{datacar:"","user":""});
        }
    }
    //产品列表
    function ejsproductL(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("productL",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("productL", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("productL", { datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            res.render("productL",{datacar:"","user":""});
        }
    }
    //婚鞋定制
    function ejsWedding(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("wedding-shoes",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("wedding-shoes", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("wedding-shoes", { datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            res.render("wedding-shoes",{datacar:"","user":""});
        }
    }
    //时尚秀场
    function ejsfashionshow(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("fashionshow",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("fashionshow", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("fashionshow", { datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            res.render("fashionshow",{datacar:"","user":""});
        }
    }
    //商品详情
    function ejsproductInfo(req,res) {
        if(req.session.proid){
            let proid = req.session.proid;
            //console.log(proid);
            let protype;
            let procolor;

            let proInfo;
            let proTypename;
            let proAllcolor;
            let proAllsize;
            let getcomm;
            userModal.productInfo(proid).then(function (data) {
                //console.log(data);
                proInfo = data;
                protype = data[0].pro_type_id;
                //console.log(protype);
                return userModal.proType(protype);
            }).then(function (data) {
                //console.log(data[0].pro_type_name);
                proTypename = data[0].pro_type_name;
                return userModal.productguige(proid);
            }).then(function (data) {
                //console.log(data);
                proAllcolor = data;
                procolor = data[0].progg_color;
                return userModal.productguigeColor(proid,procolor);
            }).then(function (data) {
                //console.log(data);
                proAllsize = data;
                return userModal.getrecommendation(protype);
            }).then(function (data) {
                console.log(data);
                let getcomm = data;
                if(req.session.user){
                    //console.log(3);
                    let userid = req.session.user.user_id;
                    return userModal.userCar(userid).then(function (data) {
                        //console.log(1);
                        if(data.length>0){
                            res.render("productInfo",{datacar:data,user:req.session.user,
                                proInfo:proInfo,proTypename:proTypename,proAllcolor:proAllcolor,proAllsize:proAllsize,getcomm:getcomm});
                        }else{
                            if (Array.isArray(req.session.user)) {
                                res.render("productInfo", {
                                    datacar: "", user: req.session.user[0],
                                    proInfo: proInfo, proTypename: proTypename, proAllcolor: proAllcolor, proAllsize: proAllsize, getcomm: getcomm
                                });
                            } else {
                                res.render("productInfo", {
                                    datacar: "", user: req.session.user,
                                    proInfo: proInfo, proTypename: proTypename, proAllcolor: proAllcolor, proAllsize: proAllsize, getcomm: getcomm
                                });
                            }
                        }
                    })
                }else{
                    //console.log(2);
                    res.render("productInfo",{datacar:"","user":"",proInfo:proInfo,proTypename:proTypename,proAllcolor:proAllcolor,proAllsize:proAllsize,getcomm:getcomm});
                }
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        }else{
            res.redirect("personal-Load.html");//直接跳转页面  不是渲染
        }
    }
    //购物车
    function ejsshoppingCar(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            let sctjgoods;
            userModal.getshoppingcarTuiJian().then(function (data) {
                sctjgoods = data;
                return userModal.userCar(userid)
              }).then(function (data) {
                //console.log(data);
                if(data.length>0){
                    res.render("shoppingCar", { sctjgoods: sctjgoods,datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("shoppingCar", { sctjgoods: sctjgoods, datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("shoppingCar", { sctjgoods: sctjgoods, datacar: "", user: req.session.user });
                    }
                }
            })
        }else{
            //res.render("shoppingCar",{datacar:"","user":""});
            res.redirect("personal-Load.html");//直接跳转页面  不是渲染
        }
    }
    //订单详情
    function ejsorderForm(req,res) {
        if(req.session.user){
            let scdata = req.session.scdata;
            let userid = req.session.user.user_id;
            //console.log(scdata);
            let goodsdata;
            let addrdata;
            let packdata;
            let coupondata;
            userModal.goAccountbar(scdata).then(function (data) {
                //console.log(data);
                goodsdata = data;
                return userModal.userAddress(userid);
            }).then(function (data) {
                //console.log(data);
                
                addrdata = data;
                return userModal.pack();
            }).then(function (data) {
                //console.log(data);
                packdata = data;
                return userModal.coupon(userid);
            }).then(function (data) {
                //console.log(data);
                coupondata = data;
                return userModal.userCar(userid);
            }).then(function (data) {
                if(data.length>0){
                    res.render("orderForm",{coupondata:coupondata,packdata:packdata,addrdata:addrdata,goodsdata:goodsdata,datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("orderForm", { coupondata: coupondata, packdata: packdata, addrdata: addrdata, goodsdata: goodsdata, datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("orderForm", { coupondata: coupondata, packdata: packdata, addrdata: addrdata, goodsdata: goodsdata, datacar: "", user: req.session.user });
                    }
                }
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        }else{
            //res.render("orderForm",{datacar:"","user":""});
            res.redirect("personal-Load.html");//直接跳转页面  不是渲染
        }
    }
    //确认订单
    function ejsBuyPayA(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.render("Buy-PayA",{datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("Buy-PayA", { datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("Buy-PayA", { datacar: "", user: req.session.user });
                    } 
                }
            })
        }else{
            //res.render("Buy-PayA",{datacar:"","user":""});
            res.redirect("personal-Load.html");//直接跳转页面  不是渲染
        }
    }
    //支付
    function ejsBuyPayP(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            let orderid = req.session.orderid;
            let orderdata;
            userModal.getorder(orderid).then(function (data) {
                orderdata = data;
                return userModal.userCar(userid);
            }).then(function (data) {
                if(data.length>0){
                    res.render("Buy-PayP",{orderdata:orderdata,datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("Buy-PayP", { orderdata: orderdata, datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("Buy-PayP", { orderdata: orderdata, datacar: "", user: req.session.user });
                    } 
                    
                }
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        }else{
            //res.render("Buy-PayP",{datacar:"","user":""});
            res.redirect("personal-Load.html");//直接跳转页面  不是渲染
        }
    }
    //成功
    function ejspaymentSuccess(req,res) {
        if(req.session.user){
            let userid = req.session.user.user_id;
            let scdata = req.session.scdata;
            let typedata;
            let successgoods;
            //console.log(scdata);
            userModal.getgoodstypeOrder(scdata).then(function (data) {
                typedata = data;
                //console.log(typedata);
                return userModal.getsuccessgoods(typedata);
            }).then(function (data) {
                successgoods = data;
                //console.log(successgoods);
                return userModal.userCar(userid);
            }).then(function (data) {
                if(data.length>0){
                    res.render("paymentSuccess",{successgoods:successgoods,datacar:data,user:req.session.user});
                }else{
                    if (Array.isArray(req.session.user)) {
                        res.render("paymentSuccess", { successgoods: successgoods, datacar: "", user: req.session.user[0] });
                    } else {
                        res.render("paymentSuccess", { successgoods: successgoods, datacar: "", user: req.session.user });
                    } 
                   
                }
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        }else{
            //res.render("paymentSuccess",{datacar:"","user":""});
            res.redirect("personal-Load.html");//直接跳转页面  不是渲染
        }
    }
    //导航购物车删除
    function usercardelete(req,res){
        let myid = req.query.myid;
        //console.log(myid);
        userModal.usercardelete(myid).then(function (data) {
            //console.log(data);
            if(data.affectedRows!=0){
                //console.log(data.affectedRows);
                res.send("ture");
            }else{
                res.send("false");
            }
        }).catch(function (err) {
            res.send(err);
        });
    }
    //导航购物车动态
    function userShoppingCar(req,res){
        if(req.session.user){
            let userid = req.session.user.user_id;
            userModal.userCar(userid).then(function (data) {
                if(data.length>0){
                    res.send(data);
                }else{
                    res.send("false");
                }
            })
        }else{
            res.send("false");
        }
    }
    //保存商品id
    function userprlproid(req,res){
        let proid = req.query.proid;
        //console.log(proid);
        req.session.proid = proid;
        res.send("ok");
    }
    //商品详情颜色
    function productInfoColor(req,res){
        let proid = req.session.proid;
        let color = req.query.color;
        //console.log(color);
        userModal.productguigeColor(proid,color).then(function (data) {
            //console.log(data);
            res.send(data);
        })

    }
    //商品详情添加购物车
    function adduserSCar(req,res){
        if(req.session.user){
            let proid = req.session.proid;
            let userid = req.session.user.user_id;
            let price = req.query.price;
            let color = req.query.color;
            let size = req.query.size;
            let num = req.query.num;
            userModal.searchusercar(proid,userid,color,size).then(function (data) {
                if(data.length<=0){
                    return userModal.addUserSCar(proid,color,size,userid,num,price);
                }else{
                    return userModal.changeNumUserSCar(num,proid,userid,color,size);
                }
            })
            .then(function (data) {
                //console.log(data);
                if(data.affectedRows!=0){
                    res.send("ok");
                }else{
                    res.send("nok");
                }
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        }else{
            res.send("nouser");
        }
    }
    //购物车改变商品数量
    function changeGoodsNum(req,res){
        let num = req.query.num;
        let goodsid = req.query.goodsid;
        userModal.changeGoodsNum(num,goodsid).then(function (data) {
            if(data.affectedRows!=0){
                res.send("ok");
            }else{
                res.send("nok");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    };
    //购物车去订单
    function goAccountbar(req,res){
        let scdata = req.query.scdata;
        req.session.scdata = scdata;
        res.send("ok");
    };
    //订单页加地址
    function adduseraddress(req,res){
        let newaddr = req.query.newaddr;
        let userid = req.session.user.user_id;
        //console.log(newaddr);
        userModal.newaddress(userid,newaddr).then(function (data) {
            if(data.affectedRows!=0){
                res.send("ok");
            }else{
                res.send("nok");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    };
    //订单页更新地址
    function gxuseraddr(req,res){
        let userid = req.session.user.user_id;
        //console.log(newaddr);
        userModal.userAddress(userid).then(function (data) {
            if(data.length>0){
                res.send(data);
            }else{
                res.send("false");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    }
    //订单页面获取单一地址
    function getaddr(req,res){
        let addrid = req.query.addrid;
        userModal.getaddr(addrid).then(function (data) {
            if(data.length>0){
                res.send(data);
            }else{
                res.send("false");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    }
    //订单更新地址
    function updataUserAddress(req,res){
        let bjAddr = req.query.bjAddr;
        //console.log(bjAddr);
        userModal.updataUserAddress(bjAddr).then(function (data) {
            if(data.affectedRows!=0){
                res.send("ok");
            }else{
                res.send("nok");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    };
    //订单修改默认地址
    function defaultAddress(req,res){
        let userid = req.session.user.user_id;
        let gaddrid = req.query.gaddrid;
        let data1;
        //console.log(gaddrid);
        userModal.defaultAddress1(userid).then(function (data) {
            data1 = data;
            return userModal.defaultAddress2(gaddrid);
        }).then(function (data) {
            if(data.affectedRows!=0 && data1.affectedRows!=0){
                res.send("ok");
            }else{
                res.send("nok");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    };
    //提交订单
    function getuserorder(req,res){
        let userid = req.session.user.user_id;
        let scdata = req.session.scdata;
        let tjdata = req.query.tjdata;
        let orderid;
        //console.log(tjdata,scdata);
        userModal.addorder(userid,tjdata).then(function (data) {
            //console.log(data);
            if(data.affectedRows!=0){
                orderid = data.insertId;
                req.session.orderid = orderid;
                return userModal.goAccountbar(scdata);
            }
        }).then(function (data) {
            //console.log(data);
            return userModal.addordergoods(orderid,data);
        }).then(function (data) {
            //console.log(data);
            return userModal.usercardelete(scdata);
        }).then(function (data) {
            //console.log(data);
            return userModal.deletecoupon(tjdata);
        }).then(function (data) {
            //console.log(data);
            res.send("ok");
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    }
    //订单支付成功
    function orderpaysuccess(req,res){
        let orderid = req.session.orderid;
        userModal.orderpaysuccess(orderid).then(function (data) {
            //console.log(data);
            if(data.affectedRows!=0){
                res.send("ok");
            }else{
                res.send("nok");
            }
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    }
    // 上传图片 添加商品
    // 添加商品
    function addProduct (req, res) {
        let dataObj = req.query;
        let addproId;
        let imgData = [];
        // dataObj.upFileData.forEach(ele => {
        //     ele = 'images/PrL-Img/'+ele
        //     console.log(ele)
        // });
        for (let i = 0; i < dataObj.upFileData.length;i++){
            imgData.push(dataObj.upFileData[i])
            dataObj.upFileData[i] = 'images/PrL-Img/' + dataObj.upFileData[i]
        }
        console.log(dataObj)
        userModal.addProduct(dataObj).then(function (data) {
            console.log(data)
            if (data.affectedRows !== 0) {
                addproId = data.insertId;
                return userModal.addProductGg(addproId, dataObj, imgData);
            }
            else res.send('nok');
        }).then(data => {
            if (data.affectedRows !== 0) res.send('ok');
            else res.send('nok');
        }).catch(function (err) {
        console.log(err);
        })
}

function addProductnew (req, res) {
    let dataObj = req.query;
    console.log(dataObj)
    // let addproId;
    let imgData = [];
    // // dataObj.upFileData.forEach(ele => {
    // //     ele = 'images/PrL-Img/'+ele
    // //     console.log(ele)
    // // });
    for (let i = 0; i < dataObj.upFileData.length; i++) {
        imgData.push(dataObj.upFileData[i])
        dataObj.upFileData[i] = 'images/PrL-Img/' + dataObj.upFileData[i]
    }
    let imgStr = imgData.join(';');
    userModal.hasProduct(dataObj).then(data1 => {
        console.log(data1)
        if(data1.length===0){
            userModal.addProduct(dataObj).then(data => {
                console.log(data)
                return userModal.addgk(dataObj, data.insertId, imgStr)
            }).then(data => {
                console.log(data)
                if (data.affectedRows !== 0) res.send('ok');
                else res.send('nok');
            }).catch(function (err) {
                console.log(err);
            })
        }else {
            return userModal.addgk(dataObj, data1[0].pro_id, imgStr).then(data => {
                console.log(data)
                if (data.affectedRows !== 0) res.send('ok');
                else res.send('nok');
            }).catch(function (err) {
                console.log(err);
            })
        }
    })
    // console.log(dataObj)
    // userModal.addProduct(dataObj).then(function (data) {
    //     console.log(data)
    //     if (data.affectedRows !== 0) {
    //         addproId = data.insertId;
    //         return userModal.addProductGg(addproId, dataObj, imgData);
    //     }
    //     else res.send('nok');
    // }).then(data => {
    //     if (data.affectedRows !== 0) res.send('ok');
    //     else res.send('nok');
    // }).catch(function (err) {
    //     console.log(err);
    // })
}


// 庄宇 个人中心
// 个人中心渲染
function ejsuserCenter (req, res) {
    if (req.session.user) {
    let userid = req.session.user.user_id;
    let userDetail;
    let userPro;
    let userCity;
    let userArea;
    let userCenterCarData;
    userModal.userCar(userid).then(data => {
        userCenterCarData = data;
        return userModal.userAdressInfo(userid);
    }).then(function (data) {
        userPro = data[0].addr_pro;
        // console.log(userPro);
        userCity = data[0].addr_city;
        userArea = data[0].addr_area;
        userDetail = data[0].addr_detail;
        return userModal.userPrint(userid);
    }).then(function (data) {
            if (data.length > 0) {
                res.render("userCenter_zy", {
                    datacar1: data, user: req.session.user, userPro: userPro,
                    userCity: userCity, userArea: userArea, userDetail: userDetail,
                    datacar: userCenterCarData
                });
            } else {
                res.render("userCenter_zy", {
                    datacar1: data, user: req.session.user, userPro: userPro,
                    userCity: userCity, userArea: userArea, userDetail: userDetail,
                    datacar: userCenterCarData
                });
            }
    })
    } else {
        res.redirect("personal-Load.html");
    }

}
// 个人中心编辑个人信息渲染
function ejsuserEdit (req, res) {
    if (req.session.user) {
    let userid = req.session.user.user_id;
    let userDetail;
    let userPro;
    let userCity;
    let userArea;
    let userCenterCarData;
    userModal.userCar(userid).then(data => {
        userCenterCarData = data;
        return userModal.userAdressInfo(userid);
    }).then(function (data) {
        userPro = data[0].addr_pro;
        // console.log(userPro);
        userCity = data[0].addr_city;
        userArea = data[0].addr_area;
        userDetail = data[0].addr_detail;
        return userModal.userPrint(userid);
    }).then(function (data) {
            // console.log(data);
            if (data.length > 0) {
                res.render("userEdit_zy", {
                    datacar1: data, user: req.session.user, userPro: userPro,
                    userCity: userCity, userArea: userArea, userDetail: userDetail,
                    datacar: userCenterCarData
                });
            } else {
                res.render("userEdit_zy", {
                    datacar1: "", user: req.session.user, serPro: userPro,
                    userCity: userCity, userArea: userArea, userDetail: userDetail,
                    datacar: userCenterCarData
                });
            }
    })
    } else {
        res.redirect("personal-Load.html");
    }
}
// 个人中心订单渲染
function ejsuserOder_zy (req, res) {
    if (req.session.user) {
    let orderId = [];//订单ID
    let proId = [];//产品id
    let orderInfo;//所有订单信息
    let productInfo;//所有产品信息
    let OrderDetail;//订单具体信息
    let userid = req.session.user.user_id;
        let userCenterCarData;
        userModal.userCar(userid).then(data => {
            userCenterCarData = data;
            return userModal.userSelectOrder(userid);
        }).then(function (data) {
        orderInfo = data;
        // 循环把查到的id加入数组
        data.forEach(ele => {
            orderId.push(ele.order_id);
        });
        console.log(orderId);
        return userModal.SelectOrderDetail(orderId);
    }).then(function (data) {
        OrderDetail = data;
        data.forEach(ele => {
            proId.push(ele.pro_id);
        });
        return userModal.SelectProInfo(proId);
    }).then(function (data) {
        productInfo = data;
            if (data.length > 0) {
                res.render("userOrder_zy", {
                    datacar: userCenterCarData, user: req.session.user,
                    orderInfo: orderInfo, productInfo: productInfo, OrderDetail: OrderDetail,
                    datacar1: data
                });
            } else {
                res.render("userOrder_zy", {
                    datacar: userCenterCarData, user: req.session.user,
                    orderInfo: orderInfo, productInfo: productInfo, OrderDetail: OrderDetail,
                    datacar1: data
                });
          }
    })
    } else {
        res.redirect("personal-Load.html");
    }

}
// 个人中心购物车渲染
function ejsuserShopCar (req, res) {
    if (req.session.user) {
        let userid = req.session.user.user_id;
        let aaaa;
        userModal.userCar(userid).then(data => {
            aaaa = data;
            return userModal.userCenterCar(userid);
        }).then(function (data) {
            if (data.length > 0) {
                res.render("userShopCar_zy", { datacar1: data, user: req.session.user,datacar:aaaa });
            } else {
                res.render("userShopCar_zy", { datacar1: "", user: req.session.user, datacar: aaaa });
            }
        })
    } else {
        res.redirect("personal-Load.html");
    }
}
// 个人中心优惠券渲染
function ejsuserCoupon (req, res) {
    if (req.session.user) {
        let userid = req.session.user.user_id;
        let aaaa;
        userModal.userCar(userid).then(data => {
            aaaa = data;
            return userModal.userCoupon(userid);
        }).then(function (data) {
            if (data.length > 0) {
                res.render("userCoupon_zy", { datacar1: data, user: req.session.user,datacar:aaaa });
            } else {
                res.render("userCoupon_zy", { datacar1: "", user: req.session.user, datacar: aaaa });
            }
        })
    } else {
        res.redirect("personal-Load.html");
    }
}
// 个人中心动态收藏渲染
function ejsuserLike (req, res) {
    if (req.session.user) {
    let likeProid = [];
    let userid = req.session.user.user_id;
        let aaaa;
        userModal.userCar(userid).then(data => {
            aaaa = data;
            return userModal.userlikeid(userid);
        }).then(function (data) {
        data.forEach(ele => {
            likeProid.push(ele.pro_id)
        });
        console.log(likeProid);
        return userModal.userlikeidSelect(likeProid);
    }).then(function (data) {
            if (data.length > 0) {
                res.render("userLike_zy", { datacar1: data, user: req.session.user,datacar:aaaa });
                console.log(data);
            } else {
                res.render("userLike_zy", { datacar1: "", user: req.session.user,datacar: aaaa });
            }
    })
    } else {
        res.redirect("personal-Load.html");
    }
}
// 个人中心地址渲染
function ejsuserAdress (req, res) {
    if (req.session.user) {
        let userid = req.session.user.user_id;
        let aaaa;
        userModal.userCar(userid).then(data => {
            aaaa = data;
            return userModal.userCenterAdress(userid);
        }).then(function (data) {
            if (data.length > 0) {
                res.render("userAdress_zy", { datacar1: data, user: req.session.user,datacar:aaaa });
            } else {
                // res.send("fail")
                res.render("userAdress_zy", { datacar1: "", user: req.session.user, datacar: aaaa });
            }
        })
    } else {
        res.redirect("personal-Load.html");
    }
}
// 个人中心修改密码渲染
function ejsuserPwd (req, res) {
    if (req.session.user) {
        let userid = req.session.user.user_id;
        userModal.userCar(userid).then(function (data) {
            if (data.length > 0) {
                res.render("userPwd_zy", { datacar: data, user: req.session.user });
            } else {
                res.render("userPwd_zy", { datacar: "", user: req.session.user });
            }
        })
    } else {
        res.redirect("personal-Load.html");
    }
}
// 添加收货人地址
function addUserAdress (req, res) {
    let userAdressName = req.query.addsUserName;
    let userPhones = req.query.addUserTel;
    let userProlice = req.query.addUserPro;
    let usersCity = req.query.addUserCity;
    let usersAare = req.query.addUserArea;
    let addUserDetil = req.query.addUserDetil;
    // console.log(req.session);
    if (req.session.user) {
        let userid = req.session.user.user_id;
        userModal.addAdressDate(userid, userProlice, usersCity, usersAare, addUserDetil, userAdressName, userPhones).then(function (data) {
            return userModal.userCenterAdress(userid).then(function (data) {
                if (data.length > 0) {
                    res.send("ok")
                } else {
                    res.send("fail")
                }
            })
        })
    }
}
// 个人中心收藏删除功能
function userLikeDel (req, res) {
    let colId = req.query.colleId;
    console.log(colId);
    userModal.userColDelete(colId).then(function (data) {
        console.log(data);
        if (data.affectedRows != 0) {
            //console.log(data.affectedRows);
            res.send("ok");
        } else {
            res.send("false");
        }
    }).catch(function (err) {
        res.send(err);
    });
}
// 个人中心密码修改
function updatePwd (req, res) {
    let newPwd = req.query.updateNewPwd;
    console.log(newPwd);
    if (req.session.user) {
        let userid = req.session.user.user_id;
        userModal.updateUserPwd(userid, newPwd).then(function (data) {
            // console.log(data.affectedRows);
            if (data.affectedRows != 0) {
                req.session.destroy(function (err) { });
                res.send("ok");

            } else {
                res.send("fail")
            }

        })
    }
}
// 个人中心编辑个人信息功能
function userInfoEdit (req, res) {
    let userid = req.session.user.user_id;
    let alertUserName = req.query.editUserName;
    let editLoginName = req.query.editLoginName;
    let alertUserSex = req.query.editUserSex;
    let alertPhone = req.query.editPhone;
    let alertMail = req.query.editMail;
    if (req.session.user) {
        userModal.updateUser(alertUserName, editLoginName, alertUserSex, alertPhone, alertMail, userid).then(function (data) {
            if (data.affectedRows != 0) {
                res.send("ok");

            } else {
                res.send("fail")
            }
        })
    }
}
// 个人中心修改收货地址功能
function userEditAddress (req, res) {
    let editAddressId = req.query.editAddressId;
    let editName = req.query.editName;
    let editNumber = req.query.editNumber;
    let editProvince = req.query.editProvince;
    let editCitys = req.query.editCitys;
    let editArea = req.query.editArea;
    let editDetil = req.query.editDetil;
    if (req.session.user) {
        userModal.eidtUserAddress(editAddressId, editName, editNumber, editProvince, editCitys, editArea, editDetil).then(function (data) {
            if (data.affectedRows != 0) {
                res.send("ok");

            } else {
                res.send("fail")
            }
        })
    }



}
// 个人中心删除购物车记录
function shopCdel (req, res) {
    let scid = req.query.scid;
    // console.log(scid);
    userModal.shopCdel(scid).then(function (data) {
        res.send("ok")
    }).catch(function (err) {
        console.log(err);
    })
}
// 批量删除
function shopCdelA (req, res) {
    let list = req.query.list;
    // console.log(list);
    userModal.shopCdelA(list).then(function (data) {
        res.send("ok")
    }).catch(function (err) {
        console.log(err);
    })
}

function upUserPic (req, res) {
    //接收前台POST过来的base64
    var imgData = req.body.data;
    // console.log(imgData);
    //过滤data:image/png;base64,
    var base64Data = imgData.replace(/data:image\/png;base64,/, "").replace(/\s/g, "+");
    //使用express接收POST值后，base64编码字符串中的“+”号被替换成空格了，
    // 引起编码出错，img.src = base64Data;直接把nodejs服务挂掉。
    //.replace(/\s/g,"+") 就是把空格还原成+号
    var dataBuffer = new Buffer(base64Data, 'base64');
    // console.log(base64Data);
    var filename = new Date().getTime() + "_user.png";//文件名,加入时间，避免文件名重复
    console.log(filename);
    var fs = require('fs');
    fs.writeFile("public/images/userimgs/" + filename, dataBuffer, function (err) {
        if (err) {
            res.send(err);
            // 否则上传头像到数据库
        } else {
            if (req.session.user) {
                let userid = req.session.user.user_id;
                userModal.SaveUserImg(userid, filename).then(function (data) {
                    // console.log(data.affectedRows);
                    if (data.affectedRows != 0) {
                        req.session.user.user_pic = filename;//记住一定要把上传的头像存在session里
                        // 面否则页面切换头像会不起效果
                        res.send("ok");
                    } else {
                        res.send("fail")
                    }

                })
            }

        }
    });
}

    module.exports = {
        userLogin,
        ejspaymentSuccess,
        ejsBuyPayP,
        ejsBuyPayA,
        ejsorderForm,
        ejsshoppingCar,
        ejsproductInfo,
        ejsfashionshow,
        ejsWedding,
        ejsproductL,
        ejsproduct,
        ejsElegantCollocation,
        ejsAboutUs,
        ejsExit,
        ejsIndex,
        usercardelete,
        userShoppingCar,
        userprlproid,
        productInfoColor,
        adduserSCar,
        changeGoodsNum,
        goAccountbar,
        adduseraddress,
        gxuseraddr,
        getaddr,
        updataUserAddress,
        defaultAddress,
        getuserorder,
        orderpaysuccess,
        addProduct,
        addProductnew,
        ejscustomization,
        //------
        ejsuserCenter,
        ejsuserOder_zy,
        ejsuserShopCar,
        ejsuserCoupon,
        ejsuserLike,
        ejsuserAdress,
        ejsuserPwd,
        addUserAdress,
        userLikeDel,
        updatePwd,
        ejsuserEdit,
        userInfoEdit,
        userEditAddress,
        shopCdel,
        shopCdelA,
        upUserPic
    }

