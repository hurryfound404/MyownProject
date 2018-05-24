/**
 * Created by Administrator on 2018/3/30.
 */



$(function () {

    var small = $("#small-Img")[0];
    var bigImg = $("#magnifier>img")[0];
    var maskly = $(".goods-info-mask")[0];
    var box = $(".goods-info-message-l-l")[0];
    var goodsNum = $("#goods-info-message-Num").val();

    //放大镜
    small.onmouseenter = function () {
        $(".goods-info-mask").show();
        $("#magnifier").show();
    }
    small.onmouseleave = function () {
        $(".goods-info-mask").hide();
        $("#magnifier").hide();
    }
    small.onmousemove = function (event) {
        event = event || window.event;
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;
        var x = pagex - box.offsetLeft - maskly.offsetWidth/2;
        var y = pagey - box.offsetTop - maskly.offsetHeight/2;
        if(x<0){
            x = 0;
        }
        if(x>small.offsetWidth-maskly.offsetWidth){
            x = small.offsetWidth-maskly.offsetWidth;
        }
        if(y<0){
            y = 0;
        }
        if(y>small.offsetHeight-maskly.offsetHeight){
            y = small.offsetHeight-maskly.offsetHeight;
        }

        maskly.style.left = x + "px";
        maskly.style.top = y + "px";
        var bili = bigImg.offsetWidth/small.offsetWidth;
        var xx = bili*x;
        var yy = bili*y;
        bigImg.style.marginTop = -yy+"px";
        bigImg.style.marginLeft = -xx+"px";
    }

    //加入购物车
    $("#goods-info-add-car").on("click", function (e) {
        e = e || window.event;
        var addPrice = parseInt($(".goods-info-message-nowprice em").text());
        var addcolor = $("#goods-info-message-color-type li.goods-color-curren").text();
        var addsize = $("#goods-info-message-size-type li.goods-size-curren").text();
        var addnum = $("#goods-info-message-Num").val();
        //console.log(addPrice,addcolor,addsize,addnum);
        var flyElm = $('#goods-info-bigImg').clone();
        flyElm[0].className = "add-NewImg";
        flyElm.css({
            'z-index': 9000,
            'display': 'block',
            'position': 'absolute',
            "border-radius": "50%",
            "border": "1px solid #232321",
            'top': $(this).offset().top -40 +'px',
            'left': $(this).offset().left+$(this).width()/2 -20 +'px',
            'width': 40 +'px'
        });
        $('body').append(flyElm);
        flyElm.animate({
            top:"40px",
            left:$("#mall-car-btn").offset().left+"px",
            width:"20px",
            height:"20px"
        },1000,"swing", function () {
            $(".add-NewImg").remove();
            $.ajax({
                type: "get",
                url: "/adduserSCar.do",
                data:{
                    price:addPrice,
                    color:addcolor,
                    size:addsize,
                    num:addnum
                },
                success: function (ajaxObj) {
                    //console.log(ajaxObj);
                    if(ajaxObj == "ok"){
                        userShoppingCar();
                        $("#add-goods-success").html("添加成功");
                        setTimeout(function () {
                            animateLY($("#add-goods-success")[0],{"zIndex":999,"top":200,"opacity":100}, function () {
                                setTimeout(function () {
                                    animateLY($("#add-goods-success")[0],{"top":120,"opacity":0}, function () {
                                        $("#add-goods-success").css({"zIndex":-999});
                                    })
                                },100)
                            });
                        },200)
                    }else if(ajaxObj == "nouser"){
                        $("#add-goods-success").html("您未登录，请登录后再加入购物车！");
                        animateLY($("#add-goods-success")[0],{"zIndex":999,"top":200,"opacity":100}, function () {
                            setTimeout(function () {
                                animateLY($("#add-goods-success")[0],{"top":120,"opacity":0}, function () {
                                    $("#add-goods-success").css({"zIndex":-999});
                                })
                            },500)
                        });
                    }
                }
            })
        });
        $("html,body").animate({scrollTop: '0px'}, 1000);
    });

    //进入购物车
    //$("#user-car-message .go-user-goodscar").on("click", function () {
    //    window.location.href = "shoppingCar.html";
    //})

    $("#goods-info-smallImg").on("click","li", function () {
        $(this).addClass("goods-info-curren").siblings("li").removeClass("goods-info-curren");
        $("#goods-info-bigImg").attr("src",$(this).find("img").attr("src"));
        $("#magnifier img").attr("src",$(this).find("img").attr("src"));
    })

    //商品颜色查询
    $("#goods-info-message-color-type").on("click","li", function () {
        $(this).addClass("goods-color-curren").siblings("li").removeClass("goods-color-curren");
        var liColor = $(this).text();
        $.ajax({
            type: "get",
            url: "/productInfoColor.do",
            data:{
                color:liColor
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                productChangeImg(ajaxObj);
                productChangeSize(ajaxObj);
            }
        })
    })

    function productChangeImg(obj){
        var newImgLy = obj[0].progg_img_url.split(";");
        var strIngLy = '';
        var strIngLy1 = '';
        $("#goods-info-bigImg").attr("src","images/PrL-Img/"+newImgLy[0]);
        $("#magnifier img").attr("src","images/PrL-Img/"+newImgLy[0]);
        $("#goods-info-smallImg").html("");
        $("#goods-text1-img").html("");
        for(var i=0;i<newImgLy.length;i++){
            if(i == 0){
                strIngLy += '<li class="goods-info-curren"><img src="images/PrL-Img/'+newImgLy[i] +'" alt=""/></li>';
            }else{
                strIngLy += '<li><img src="images/PrL-Img/'+newImgLy[i] +'" alt=""/></li>';
            }
            strIngLy1 += '<img class="new-ad-img" src="images/PrL-Img/'+newImgLy[i]+'" alt=""/>';
        }
        $("#goods-info-smallImg").html(strIngLy);
        $("#goods-text1-img").html(strIngLy1);
    }
    function productChangeSize(obj){
        let strSize = '';
        $("#goods-info-message-size-type").html("");
        for(var i=0;i<obj.length;i++){
            if(i==0){
                strSize += '<li class="goods-size-curren">'+obj[i].progg_size+'</li>';
            }else{
                strSize += '<li>'+obj[i].progg_size+'</li>';
            }
        }
        $("#goods-info-message-size-type").html(strSize);
        $("#goods-info-counts").html(obj[0].progg_amount);
    }


    //商品尺寸查询库存
    $("#goods-info-message-size-type").on("click","li", function () {
        $(this).addClass("goods-size-curren").siblings("li").removeClass("goods-size-curren");
        var liColor;
        var liSize = $(this).text();
        $("#goods-info-message-color-type li").each(function () {
            if($(this).hasClass("goods-color-curren")){
                liColor = $(this).text();
            }
        });
        $.ajax({
            type: "get",
            url: "/productInfoColor.do",
            data:{
                color:liColor
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                for(var i=0;i<ajaxObj.length;i++){
                    if(ajaxObj[i].progg_size == liSize){
                        $("#goods-info-counts").html(ajaxObj[i].progg_amount);
                    }
                }
            }
        })
    })

    //商品规格相关
    $("#minus-goods").on("click", function () {
        goodsNum--;
        if(goodsNum<=0){
            goodsNum = 0;
            $(this)[0].className = "minus-goods-num0";
        }else {
            $(this)[0].className = "minus-goods-not0";
        }
        $("#goods-info-message-Num").val(goodsNum);

    })
    $("#add-goods").on("click", function () {
        goodsNum++;
        $("#goods-info-message-Num").val(goodsNum);
        $("#minus-goods")[0].className = "minus-goods-not0";
    })

    $(".goods-des").on("click", function () {
        $(this).addClass("active");
        $(".service-des").removeClass("active");
        $(".goods-info-message-l-bottom-text").show();
        $(".goods-info-message-l-bottom-service").hide();
    })
    $(".service-des").on("click", function () {
        $(this).addClass("active");
        $(".goods-des").removeClass("active");
        $(".goods-info-message-l-bottom-text").hide();
        $(".goods-info-message-l-bottom-service").show();
    })



})