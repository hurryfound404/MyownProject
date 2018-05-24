/**
 * Created by Administrator on 2018/3/28.
 */


$(function () {
    var delateId=[];
    //导航删除商品
    $("#car-message").on("click",".user-goods-scbtn",function () {
        delateId.push($(this).parents("li").attr("myid"));
        $(".mask-ly-nav").show();
        $(".sc-delete-confirm-nav").show();
        //console.log(delateId);
    });
    $("#sc-cancel-nav").on("click", function () {
        $(".mask-ly-nav").hide();
        $(".sc-delete-confirm-nav").hide();
        delateId = [];
    });
    $("#sc-confirm-nav").on("click", function () {
        $(".mask-ly-nav").hide();
        $(".sc-delete-confirm-nav").hide();
        $.ajax({
            type: "get",
            url: "/usercardelete.do",
            //dataType:"json",
            data:{
                myid:delateId
            },
            success:function(ajaxObj){
                //console.log(ajaxObj);
                if(ajaxObj!=false){
                    //$("#user-car-message li").each(function () {
                    //    if($(this).attr("myid")==delateId){
                    //        $(this).remove();
                    //    }
                    //})
                    userShoppingCar();
                    if($("#car-message").attr("scNav")=="ture"){
                        $("#shoppingcar-tbody tr").each(function () {
                            if($(this).attr("goodsid")==delateId[0]){
                                $(this).remove();
                            }
                        });
                        if($("#shoppingcar-tbody tr").length>0){
                            $(".sc-notgoods-ts").hide();
                        }else{
                            $(".sc-notgoods-ts").show();
                        }
                        shoppingCarCount();
                    }
                    delateId = [];
                }
            }
        });
    })
    var navBoolean = true;
    $("#search-btn").attr('chooseState',false)
    $("#search-btn").on("click",function () {
        if ($("#search-btn").attr('chooseState') ==='false'){
            $("#search-btn").attr('chooseState', true)
            $("#nav-search").animate({ width: "180px", opacity: 1 }, 300);
            $("#nav-search").focus();
            console.log($("#nav-search").width())
        }else {
            $("#search-btn").attr('chooseState', false)
            console.log($("#nav-search").val())
            console.log($("#nav-search").width())
            let navValue = $("#nav-search").val();
            if ($("#nav-search").val() !== '' && navBoolean){
                navBoolean = false;
                $.ajax({
                    type: "get",
                    data: {
                        value: navValue
                    },
                    dataType: "text",
                    url: "/navSearch.do",
                    success: function (ajaxObj) {
                        // console.log(ajaxObj)
                        if (ajaxObj=='ok'){
                            navBoolean = true;
                            window.location.href = "productL.html";
                        }
                    }
                })
            }
        }
    
        // $("#nav-search").focus();
        
    })
    $("#nav-search").on("focus", function () {
        console.log(2)
        // $(this).animate({ width: "0px", opacity: 0 }, 300);
    })
    // $("#nav-search").on("blur", function () {
    //     console.log(1)
    //     $(this).animate({width:"0px",opacity:0},300);
    // })

    $(window).scroll(function(e){
        if($(window).scrollTop()>=210){
            $("#go-top").show(100);
            $("#tel-code").show(100);
        }else {
            $("#go-top").hide(100);
            $("#tel-code").hide(100);
        }
    })
    $("#go-top").on("click", function () {
        var h = $(window).scrollTop();
        animateNav(0,h);
    })

    var timer =null;
    function animateNav(t,l){
        clearInterval(timer);
        timer = setInterval(function () {
            var step = (t-l)/10;
            step = step>0?Math.ceil(step):Math.floor(step);
            l = l + step;
            window.scrollTo(0,l);
            if(Math.abs(t-l)<=Math.abs(step)){
                window.scrollTo(0,t);
                clearInterval(timer);
            }
        },20)
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
        $("#user-goods-allprice strong").html(allMoney+".00");
    }

})