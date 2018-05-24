/**
 * Created by Administrator on 2018/3/16.
 */


const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController.js');

router.get("/exit.do",userController.ejsExit);
router.get("/index.html", userController.ejsIndex);
router.get("/AboutUs.html", userController.ejsAboutUs);
router.get("/ElegantCollocation.html", userController.ejsElegantCollocation);
router.get("/product.html", userController.ejsproduct);
router.get("/productL.html", userController.ejsproductL);
router.get("/wedding-shoes.html", userController.ejsWedding);
router.get("/fashionshow.html", userController.ejsfashionshow);
router.get("/productInfo.html", userController.ejsproductInfo);
router.get("/shoppingCar.html", userController.ejsshoppingCar);
router.get("/orderForm.html", userController.ejsorderForm);
router.get("/Buy-PayA.html", userController.ejsBuyPayA);
router.get("/Buy-PayP.html", userController.ejsBuyPayP);
router.get("/paymentSuccess.html", userController.ejspaymentSuccess);
router.get("/customization.html", userController.ejscustomization);

//导航购物车删除
router.get("/usercardelete.do", userController.usercardelete);
//导航购物车动态
router.get("/userShoppingCar.do", userController.userShoppingCar);
//保存商品id
router.get("/prlproid.do", userController.userprlproid);
//商品详情颜色
router.get("/productInfoColor.do", userController.productInfoColor);
//商品详情添加购物车
router.get("/adduserSCar.do", userController.adduserSCar);
//购物车改变商品数量
router.get("/changeGoodsNum.do", userController.changeGoodsNum);
//购物车去订单
router.get("/goAccountbar.do", userController.goAccountbar);
//订单页加地址
router.get("/adduseraddress.do", userController.adduseraddress);
//订单页更新地址
router.get("/gxuseraddr.do", userController.gxuseraddr);
//订单页面获取单一地址
router.get("/getaddr.do", userController.getaddr);
//订单更新地址
router.get("/updataUserAddress.do", userController.updataUserAddress);
//订单修改默认地址
router.get("/defaultAddress.do", userController.defaultAddress);
//提交订单
router.get("/getuserorder.do", userController.getuserorder);
//订单支付成功
router.get("/orderpaysuccess.do", userController.orderpaysuccess);



// zy  个人中心
// 个人中心  ejs渲染开始
router.get("/userCenter_zy.html", userController.ejsuserCenter);
// 个人中心订单
router.get("/userOrder_zy.html", userController.ejsuserOder_zy);

// 个人中心购物车
router.get("/userShopCar_zy.html", userController.ejsuserShopCar);
// 个人中心优惠券
router.get("/userCoupon_zy.html", userController.ejsuserCoupon);
// 个人中心收藏
router.get("/userLike_zy.html", userController.ejsuserLike);
// 个人中心地址
router.get("/userAdress_zy.html", userController.ejsuserAdress);
// 个人中心密码管理
router.get("/userPwd_zy.html", userController.ejsuserPwd);
// 个人中心编辑个人信息
router.get("/userEdit_zy.html", userController.ejsuserEdit);
// 个人中心ejs渲染结束

// 个人中心功能模块开始
// 个人中心添加收货地址功能
router.get("/addAdress.do", userController.addUserAdress);
// 个人中心收藏动态渲染功能
router.get("/addAdress.do", userController.addUserAdress);
// 个人中心单个收藏删除功能
router.get("/deletUserLike.do", userController.userLikeDel);
// 个人中心密码修改
router.get("/updatePwd.do", userController.updatePwd);
// 个人中心编辑个人信息功能
router.get("/userEdit.do", userController.userInfoEdit);
// 个人中心修改收货地址功能
router.get("/editAddress.do", userController.userEditAddress);
// 个人中心购物车删除
router.get("/shopCdel.do", userController.shopCdel);
// 个人中心购物车批量删除
router.get("/shopCdelA.do", userController.shopCdelA);
// 个人中心上传头像并且保存头像到数据库
router.post("/upPic.do", userController.upUserPic);


// router.get("/", function(req,res){
//     req.session.destroy();
//     res.redirect("index.html");//直接跳转页面  不是渲染
// });

//router.get("/exit.do",userController.ejsExit);
//router.get("/aboutus.html",userController.ejsAbout);
//router.get("/goods.html",userController.ejsGoods);

module.exports = router;