/**
 * Created by Administrator on 2018/3/31.
 */



//缓动动画
function animateLY(obj,json,fn) {
    // 第一参数 动的对象   2  attr  动的那个属性   3   属性值少多少
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  //  用来判断是否停止定时器   定时器的里面
        //  每隔 30 毫秒就要运行一次
        for(var k in json) {  // k 属性     json[k] 是属性值
            var leader = 0;
            // 因为透明度是 小数   取值 0~1 之间    第二个  它没有单位
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
            if(fn){   // 如果有函数传递过来  ， 定时器结束了，说明动画结束  可以执行 回调函数
                fn();   // 执行函数  fn + ();
            }
        }
    },35)
}

//获取最终样式
function getStyle(obj,attr) {
    if(obj.currentStyle) {

        return  obj.currentStyle[attr];
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];
    }
}

//获取高度
function scroll() {
    if(window.pageYOffset != null) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
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

