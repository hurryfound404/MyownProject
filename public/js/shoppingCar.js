/**
 * Created by Administrator on 2018/3/31.
 */


$(function () {

    var scGoodsId=[];
    var goAccountbarData = [];
    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        //console.log($(window).height());
        if(scroll<80+$("#shoppingcar-table").offset().top+$("#shoppingcar-table").height()-$(window).height()){
            $("#sc-allmessage").css({"position":"fixed","bottom":"0px","left":0,"width":"100%",
            "-webkit-box-shadow":"0 0 10px rgba(0,0,0,.1)",
            "box-shadow": "0 0 10px rgba(0,0,0,.1)"});
        }else {
            $("#sc-allmessage").css({"position":"static","bottom":"-100px","box-shadow":"none"});
        }
    });

    //标记导航
    $("#car-message").attr("scNav","ture");

    //全选1
    $("#all-checkbox").on("click", function () {
        //console.log(this.checked);
        if($(this).is(':checked')){
            $("#shoppingcar-tbody input:checkbox").prop("checked", true);
            $("#sc-allmessage-checkbox").prop("checked", true);
        }else {
            $("#shoppingcar-tbody input:checkbox").prop("checked", false);
            $("#sc-allmessage-checkbox").prop("checked", false);
        }
        shoppingCarCount();
    });
    //全选2
    $("#sc-allmessage-checkbox").on("click", function () {
        if($(this).is(':checked')){
            $("#shoppingcar-tbody input:checkbox").prop("checked", true);
            $("#all-checkbox").prop("checked", true);
        }else {
            $("#shoppingcar-tbody input:checkbox").prop("checked", false);
            $("#all-checkbox").prop("checked", false);
        }
        shoppingCarCount();
    });
    //减数量商品
    $("#shoppingcar-tbody .del-goods-num").on("click", function () {
        var scGoodsNum = $(this).next().val();
        scGoodsNum --;
        if(scGoodsNum <=1){
            scGoodsNum = 1;
            $(this).css("cursor","not-allowed");
        }else{
            $(this).css("cursor","pointer");
        }
        $(this).next().val(scGoodsNum);
        changeGoodsNum(this);
    });
    //加数量商品
    $("#shoppingcar-tbody .add-goods-num").on("click", function () {
        var scGoodsNum = $(this).prev().val();
        scGoodsNum ++;
        $(this).css("cursor","pointer");
        $(this).prev().prev().css("cursor","pointer");
        $(this).prev().val(scGoodsNum);
        changeGoodsNum(this);
    });
    //取消商品
    $("#shoppingcar-tbody .s-goods-ipt").on("click", function () {
        $("#shoppingcar-tbody .s-goods-ipt").each(function () {
            if(!($(this).is(':checked'))){
                $("#all-checkbox").prop("checked", false);
                $("#sc-allmessage-checkbox").prop("checked", false);
            }
        })
        shoppingCarCount();
    });
    //删除商品
    $("#shoppingcar-tbody").on("click",".sc-delate", function () {
        $(".mask-ly").show();
        $(".sc-delete-confirm").show();
        scGoodsId.push($(this).parents("tr").attr("goodsid"));
        //console.log(scGoodsId);
    });
    $("#sc-cancel").on("click", function () {
        $(".mask-ly").hide();
        $(".sc-delete-confirm").hide();
        scGoodsId = [];
    });
    $("#sc-confirm").on("click", function () {
        $(".mask-ly").hide();
        $(".sc-delete-confirm").hide();
        $.ajax({
            type: "get",
            url: "/usercardelete.do",
            data:{
                myid:scGoodsId
            },
            success: function (ajaxObj) {
                console.log(ajaxObj);
                if(ajaxObj){
                    $("#shoppingcar-tbody tr").each(function () {
                        if($.inArray($(this).attr("goodsid"),scGoodsId)!=-1){
                            $(this).remove();
                        }
                    });
                    if($("#shoppingcar-tbody tr").length>0){
                        $(".sc-notgoods-ts").hide();
                    }else{
                        $(".sc-notgoods-ts").show();
                    }
                    scGoodsId = [];
                    shoppingCarCount();
                    userShoppingCar();
                }
            }
        })
    });

    //多商品删除
    $("#sc-allmessage-l-l-del").on("click", function () {
        $(".mask-ly").show();
        $(".sc-delete-confirm").show();
        $("#shoppingcar-tbody .s-goods-ipt").each(function () {
            if(($(this).is(':checked'))){
                scGoodsId.push($(this).parents("tr").attr("goodsid"));
            }
        })
    });

    //结算到订单页面
    $("#go-accountbar").on("click", function () {
        $("#shoppingcar-tbody .s-goods-ipt").each(function () {
            if(($(this).is(':checked'))){
                goAccountbarData.push($(this).parents("tr").attr("goodsid"));
            }
        });
        $.ajax({
            type: "get",
            url: "/goAccountbar.do",
            data:{
                scdata:goAccountbarData
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                if(ajaxObj == "ok"){
                    window.location.href = "orderForm.html";
                }
            }
        })
    })

    //后台改变商品数量
    function changeGoodsNum(domObj){
        $.ajax({
            type: "get",
            data:{
                num:$(domObj).parent().find(".sc-goods-num").val(),
                goodsid:$(domObj).parents("tr").attr("goodsid")
            },
            //dataType:"json",
            url:"/changeGoodsNum.do",
            success:function(ajaxObj) {
                //console.log(ajaxObj);
                if(ajaxObj == "ok"){
                    shoppingCarCount();
                    userShoppingCar();
                }
            }

        })
    }

    //计算方法
    function shoppingCarCount(){
        var allMoney = 0;
        var allNum = 0;
        $("#shoppingcar-tbody .s-goods-ipt").each(function () {
            if($(this).is(':checked')){
                allMoney += Number($(this).parents("tr").find(".sc-goods-price i").text())*Number($(this).parents("tr").find(".sc-goods-num").val());
                allNum += Number($(this).parents("tr").find(".sc-goods-num").val());
            }
        });
        //console.log(allMoney,allNum);
        $("#user-goods-nums i").html(allNum);
        $("#user-goods-allprice strong").html(toDecimal2(allMoney));
    }

    //导航购物车动态添加
    function userShoppingCar(){
        $.ajax({
            type: "get",
            dataType:"json",
            url:"/userShoppingCar.do",
            success:function(ajaxObj){
                //console.log(ajaxObj);
                var userCarnum = 0;
                var strly = '';
                if(ajaxObj!=false){
                    $("#car-message")[0].className = "car-message-hasgoods";
                    $("#car-message").html("");
                    for(var i=0;i<ajaxObj.length;i++){
                        userCarnum += ajaxObj[i].sc_amount;
                        strly +='<li class="clearfix" myid="'+ajaxObj[i].sc_id+'">'+
                        '<img class="user-car-goods-img" src="'+ajaxObj[i].prourl+'" alt=""/>'+
                        '<div class="user-car-goods-name">'+ajaxObj[i].proname+'</div>'+
                        '<div class="user-car-goods-price">'+
                        '<div class="user-goods-price-message">'+
                        '<span class="user-goods-price">￥'+ajaxObj[i].pro_price+'</span>x<i>'+ajaxObj[i].sc_amount+'</i>'+
                        '</div>'+
                        '<span class="user-goods-scbtn">删除</span>'+
                        '</div>'+
                        '</li>';
                    }
                    $("#car-message").html('<p>最近您加入的商品</p>'+
                    '<ul id="user-car-message">'+strly+
                    '</ul><a class="go-user-goodscar btnly" href="shoppingCar.html" target="_top">去购物车</a>')
                    $("#car-num").html(userCarnum);
                }else{
                    $("#car-message")[0].className = "car-message-notgoods";
                    $("#car-message").html("<span>购物车中还没有商品，赶紧选购吧！</span>");
                    $("#car-num").html(userCarnum);
                }
            }
        })
    }

    //2
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
})