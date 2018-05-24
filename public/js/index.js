

$(function () {

    $('#new-goods-btn').on('click',function(){
        window.location.href = 'productL.html'
    })

    $('#wedding-shoes-btn').on('click',function(){
        window.location.href = 'customization.html'
    })
    $('#lifestory-ad-btn').on('click',function(){
        window.location.href = 'AboutUs.html'
    })

    var json = [
        {   //  1
            height:420,
            top:36,
            left:-900,
            opacity:40,
            z:2
        },
        {  // 2
            height:470,
            top:8,
            left:0,
            opacity:100,
            z:3
        },
        {   // 3
            height:420,
            top:36,
            left:900,
            opacity:40,
            z:2
        }
    ];

    var flag = true;
    var lis = document.getElementsByClassName("bannerbox");
    var index = 2;
    var timerBnaner = null;
    var timerGbox = null;
    var gboxIndex = 0;
    var timerBoolean = false;


    $("img.lazy").lazyload({
        effect: "show",// 载入使用何种效果
        threshold: 200 // 提前开始加载
    });

    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        //console.log(scroll);
        if(scroll>$(".new-goods").offset().top-300 && scroll<1200){
            $(".new-goods-title").css({opacity:1});
            $(".new-goods-a1").css({opacity:1,left: "40px", top: "100px"});
            $(".new-goods-a2").css({opacity:1,right: "200px", top: "245px"});
            $(".new-goods-a3").css({opacity:1,left: "40px", top: "715px"});
            $(".new-goods-a4").css({opacity:1,right: "40px", top: "650px"});
            if(!timerBoolean){
                setTimeout(function () {
                    timerBoolean = true;
                },1000)
            }
        }
        if(scroll>1700 && scroll<2900){
            $(".wedding-shoes-title").css({opacity:1});
            $(".wshoes-box1-word").css({opacity:1,left: "360px"});
            $(".wedding-shoes-box1-img").css({opacity:1,left: "0px"});
            $(".wshoes-box2-word").css({opacity:1,left: "85px"});
            $(".wedding-shoes-box2-img").css({opacity:1,right:"40px"});
            $(".wshoes-box3-word").css({opacity:1,left: "360px"});
            $(".wedding-shoes-box3-img").css({opacity:1,left:"0px"});
        }
        if(scroll>2920){
            $(".lifestory-img").css({opacity:1});
            $(".lifestory-title").css({opacity:1});
        }
        if(scroll>3300){
            $(".lifestory-message-img1").css({opacity:1,left: "120px", top: "80px"});
            $(".lifestory-message-img2").css({opacity:1,left: "164px", top: "425px"});
            $(".lifestory-message-img3").css({opacity:1,left: "673px", top: "360px"});
            $(".lifestory-message-word").css({opacity:1,right: "300px", top: "90px"});
            $(".lifestory-logo").css({opacity:1});
        }
    })

    timerGbox = setInterval(function () {
        if(timerBoolean){
            gboxIndex++;
            if(gboxIndex == 3){
                gboxIndex = 0;
            }
            newGoods();
        }
    },2000)

    $(".new-goods .w>a").on("mouseover", function (e) {
        //e.stopPropagation();
        clearInterval(timerGbox);
        //$(this).find(".goods-des-span")[gboxIndex].className = "goods-des-span goods-des-span-go";

    })
    $(".new-goods .w>a").on("mouseout", function () {
        //$(this).find(".goods-des-span")[gboxIndex].className = "goods-des-span";
        timerGbox = setInterval(function () {
            gboxIndex++;
            if(gboxIndex == 3){
                gboxIndex = 0;
            }
            newGoods();
        },2000)
    })
    $(".new-goods .w>.new-goods-arrow").on("mouseover", function () {
        clearInterval(timerGbox);
    })
    $(".new-goods .w>.new-goods-arrow").on("mouseout", function () {
        timerGbox = setInterval(function () {
            gboxIndex++;
            if(gboxIndex == 3){
                gboxIndex = 0;
            }
            newGoods();
        },2000)
    })


    $("#new-goods-left-arrow").on("click", function () {
        //clearInterval(timerGbox);
        gboxIndex--;
        if(gboxIndex == -1){
            gboxIndex = 2;
        }
        newGoods();
    })
    $("#new-goods-right-arrow").on("click", function () {
        gboxIndex++;
        if(gboxIndex == 3){
            gboxIndex = 0;
        }
        newGoods();
    })



    move(true);
    timerBnaner = setInterval(function () {
        move(true);
    },2000);
    $("#banner-left-arrow").on("click", function () {
        move(false);
    });
    $("#banner-right-arrow").on("click", function () {
        move(true);
    });
    $(".banner .w").on("mouseover", function () {
        clearInterval(timerBnaner);
    });
    $(".banner .w").on("mouseout", function () {
        timerBnaner = setInterval(function () {
            move(true);
        },2000)
    });


    function move(x) {
        if(x != undefined) {
            if(x) {
                json.unshift(json.pop());
            }else {
                json.push(json.shift());
            }
        }
        for(var i=0;i<json.length;i++) {
            animate1(lis[i],{
                height: json[i].height,
                top: json[i].top,
                left: json[i].left,
                opacity: json[i].opacity,
                zIndex: json[i].z
            },function(){ flag = true; })
        }
        $(".bannerbox .bannerword-p1").css({bottom:"-20px",opacity: 0});
        $(".bannerbox .bannerword-p2").css({bottom:"-20px",opacity: 0});
        $(".bannerbox .bannerword-p3").css({width:"0px"});

        $($(".bannerbox")[index]).find(".bannerword-p1").delay(500).animate({bottom:"100px",opacity: 1},600);
        $($(".bannerbox")[index]).find(".bannerword-p2").delay(700).animate({bottom:"60px",opacity: 1},600);
        $($(".bannerbox")[index]).find(".bannerword-p3").delay(800).animate({width:"70px"},600);

        index++;
        if(index==3){
            index = 0;
        }
    }
    function newGoods () {
        $("#new-goods-nav span").eq(gboxIndex).addClass("new-goods-nav-span").siblings("span").removeClass("new-goods-nav-span");
        //1
        $(".new-goods-a1 .g-box1-1").css({opacity:"0","z-index":1});
        $(".new-goods-a1 .g-box1-1").eq(gboxIndex).css({opacity:"1","z-index":3});
        $(".new-goods-a1>.g-box1 img").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({right: "-115px", opacity: 1});
            }else {
                $(this).css({right: "-145px", opacity: 0});
            }
        })
        $(".new-goods-a1>.g-box1 .goods-des-p1").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "20px", opacity: 1});
            }else {
                $(this).css({left: "50px", opacity: 0});
            }
        })
        $(".new-goods-a1>.g-box1 .goods-des-p2").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "20px", opacity: 1});
            }else {
                $(this).css({left: "50px", opacity: 0});
            }
        })
        $(".new-goods-a1>.g-box1 .goods-des-span").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "20px", opacity: 1});
            }else {
                $(this).css({left: "-10px", opacity: 0});
            }
        })

        //2
        $(".new-goods-a2 .g-box1-1").css({opacity:"0","z-index":1});
        $(".new-goods-a2 .g-box1-1").eq(gboxIndex).css({opacity:"1","z-index":3});
        $(".new-goods-a2>.g-box2 img").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({right: "46px", opacity: 1});
            }else {
                $(this).css({right: "76px", opacity: 0});
            }
        })
        $(".new-goods-a2>.g-box2 .goods-des-p1").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "380px", opacity: 1});
            }else {
                $(this).css({left: "410px", opacity: 0});
            }
        })
        $(".new-goods-a2>.g-box2 .goods-des-p2").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "380px", opacity: 1});
            }else {
                $(this).css({left: "410px", opacity: 0});
            }
        })
        $(".new-goods-a2>.g-box2 .goods-des-span").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "380px", opacity: 1});
            }else {
                $(this).css({left: "350px", opacity: 0});
            }
        })

        //3
        $(".new-goods-a3 .g-box1-1").css({opacity:"0","z-index":1});
        $(".new-goods-a3 .g-box1-1").eq(gboxIndex).css({opacity:"1","z-index":3});
        $(".new-goods-a3>.g-box3 img").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({right: "-65px", opacity: 1});
            }else {
                $(this).css({right: "-95px", opacity: 0});
            }
        })
        $(".new-goods-a3>.g-box3 .goods-des-p1").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "20px", opacity: 1});
            }else {
                $(this).css({left: "-10px", opacity: 0});
            }
        })
        $(".new-goods-a3>.g-box3 .goods-des-p2").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "20px", opacity: 1});
            }else {
                $(this).css({left: "-10px", opacity: 0});
            }
        })
        $(".new-goods-a3>.g-box3 .goods-des-span").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "20px", opacity: 1});
            }else {
                $(this).css({left: "50px", opacity: 0});
            }
        })

        //4
        $(".new-goods-a4 .g-box1-1").css({opacity:"0","z-index":1});
        $(".new-goods-a4 .g-box1-1").eq(gboxIndex).css({opacity:"1","z-index":3});
        $(".new-goods-a4>.g-box4 img").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({right: "-65px", opacity: 1});
            }else {
                $(this).css({right: "-95px", opacity: 0});
            }
        })
        $(".new-goods-a4>.g-box4 .goods-des-p1").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "-145px", opacity: 1});
            }else {
                $(this).css({left: "-175px", opacity: 0});
            }
        })
        $(".new-goods-a4>.g-box4 .goods-des-p2").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "-145px", opacity: 1});
            }else {
                $(this).css({left: "-175px", opacity: 0});
            }
        })
        $(".new-goods-a4>.g-box4 .goods-des-span").each(function (index) {
            if(index ==gboxIndex ){
                $(this).css({left: "-145px", opacity: 1});
            }else {
                $(this).css({left: "-115px", opacity: 0});
            }
        })

    }

})


function animate1(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        for(var k in json) {
            var leader = 0;
            if(k == "opacity") {
                leader =  Math.round(getStyle(obj,k) * 100) || 100;
            }
            else {
                leader = parseInt(getStyle(obj,k)) || 0;
            }
            var step = (json[k] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if( k == "opacity") {
                obj.style.opacity = leader / 100;
                obj.style.filter = "alpha(opacity = "+leader+")";
            }
            else if(k == "zIndex") {
                obj.style.zIndex = json[k];
            }
            else {
                obj.style[k] = leader + "px";
            }
            if(leader != json[k]) {
                flag = false;
            }
        }
        if(flag) {
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },25)
}

function getStyle(obj,attr) {
    if(obj.currentStyle) {
        return  obj.currentStyle[attr];
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];
    }
}