


$(function () {
    $("#Pro").on("click", ".buybuy", function () {
        var proid = $(this).parents(".shopList1").attr("proid");
        console.log(proid);
        if (proid > 2) {
            proid = 1;
        }
        //window.localStorage.setItem("proid",proid);
        $.ajax({
            type: "get",
            url: "/prlproid.do",
            data: {
                proid: proid
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                if (ajaxObj == "ok") {
                    window.location.href = "productInfo.html";
                }
            }
        })
    });
    $("#Pro").on("click", ".ly_a", function () {
        var proid = $(this).parents(".shopList1").attr("proid");
        console.log(proid);
        if (proid > 2 && proid <=20) {
            proid = 1;
        }
        //window.localStorage.setItem("proid",proid);
        $.ajax({
            type: "get",
            url: "/prlproid.do",
            data: {
                proid: proid
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                if (ajaxObj == "ok") {
                    window.location.href = "productInfo.html";
                }
            }
        })
    })

    $('header').hide();
    $('#ly_w').hide();
    $('footer').hide();
    window.onload = function () {
        setTimeout(() => {
            $('#loading').addClass('animated zoomOutDown');
            $('header').show();
            $('#ly_w').show();
            $('footer').show();
        }, 1000);
    }



})




var k = true;
var h = true;
var p = true;
var Kind;
var SHeight;
var SPrice;
function sea () {
    var param = "Kind=" + Kind + "&SHeight=" + SHeight + "&SPrice=" + SPrice;
    ajaxFn({
        "method": "post",
        "url": "/Prsearch.do",
        "param": param,
        "callback": function (xml) {
            var obj = JSON.parse(xml.responseText);
            var Pro = document.getElementById('Pro');
            Pro.innerHTML = "";
            for (var i = 0; i < obj.length; i++) {
                Pro.innerHTML += "<div class='shopList1' proid=" + obj[i].pro_id + "><div class='Collection'><span>&#xe601;</span></div>" +
                    "<div class='tot'><a class='ly_a' href='javascript:;'><img src=" + obj[i].pro_img_goods_dp + " alt='' class='img1'></a>" +
                    "<a class='ly_a' href='javascript:;'><img src=" + obj[i].pro_img_goods + " alt='' class='img2'></a></div><div class='description'>" +
                    "<p class='nP'>" + obj[i].pro_name + '&nbsp¥ &nbsp' + obj[i].pro_new_price + "</p><p class='buybuy'>查看详情</p></div></div>"
            }
        }
    })
}
$(".Kind").click(function () {
    Kind = $(this).text();
    sea()
});
$(".SHeight").click(function () {
    SHeight = $(this).text();
    sea()
});
$(".SPrice").click(function () {
    SPrice = $(this).text();
    sea()
});
$("#ind").click(function () {
    if (k) {
        // $('#Kind').css("background-color", "white");
        //  $(this).css("background-color", "#f5f5f5f5");
        $('#Kind').css("height", "120px");
        $('#Kind').css("visibility", "visible");
        k = false
    } else {
        $('#Kind').css("height", "0px");
        $('#Kind').css("visibility", "hidden");
        k = true
    }
});
$("#height").click(function () {
    if (h) {
        $('#SHeight').css("height", "80px");
        $('#SHeight').css("visibility", "visible");
        h = false
    } else {
        $('#SHeight').css("height", "0px");
        $('#SHeight').css("visibility", "hidden");
        h = true
    }
});
$("#price").click(function () {
    if (p) {
        $('#SPrice').css("height", "80px");
        $('#SPrice').css("visibility", "visible");
        p = false
    } else {
        $('#SPrice').css("height", "0px");
        $('#SPrice').css("visibility", "hidden");
        p = true
    }
});


///////////////  后  台  //////////////////
var pageSize = 12;   //每页显示的条数
var currenPage = 1;  //默认显示第一页数据
var totalCount;
var totalPage;
ProL();
getTotalCount();


function ProL () {
    ajaxFn({
        "callback": function (xmlHttp) {
            var obj = JSON.parse(xmlHttp.responseText);
            console.log(obj)
            var Pro = document.getElementById('Pro');
            Pro.innerHTML = "";
            if (obj.length==0){
                Pro.innerHTML = `<p style='text-align:center;font-size:30px;padding: 50px 0 62px 0'>没有找到相应商品</p>`
            }else {
                for (var i = 0; i < obj.length; i++) {
                    Pro.innerHTML += "<div class='shopList1' proid=" + obj[i].pro_id + "><div class='Collection'><span>&#xe601;</span></div>" +
                        "<div class='tot'><a class='ly_a' href='javascript:;'><img src=" + obj[i].pro_img_goods_dp + " alt='' class='img1'></a>" +
                        "<a class='ly_a' href='javascript:;'><img src=" + obj[i].pro_img_goods + " alt='' class='img2'></a></div><div class='description'>" +
                        "<p class='nP'>" + obj[i].pro_name + '&nbsp¥ &nbsp' + obj[i].pro_new_price + "</p><p class='buybuy'>查看详情</p></div></div>"
                }
            }
            
        },
        "param": "size=" + pageSize + "&current=" + currenPage,
        "method": "get",
        "url": "/Prlist.do",
    })
}
function getTotalCount () {
    ajaxFn({
        "method": "post",
        "param": "",
        "url": "/Prcount.do",
        "callback": function (xml) {
            // console.log(xml.responseText);
            var obj = JSON.parse(xml.responseText);
            totalCount = obj[0].num;
            totalPage = Math.ceil(totalCount / pageSize);
            var divPage = $("#divPage").html('');
            for (var i = 0; i < totalPage; i++) {
                divPage.append("<a href='#' class='aPage'>" + (i+1) + "</a>")
            }
        }
    })
}

$("#divPage").on('click', ".aPage", function () {
    currenPage = $(this).text();
    ProL()
});
$("#btnFirst").on("click", function () {
    currenPage = 1;
    ProL()
});
$("#btnLast").on("click", function () {
    if (totalPage != undefined) {
        currenPage = totalPage;
        ProL()
    }
});
$("#btnPrev").on("click", function () {
    if (totalPage > 1) {
        currenPage--;
        ProL()
    }
});
$("#btnNext").on("click", function () {
    if (currenPage < totalPage) {
        currenPage++;
        ProL()
    }
});
///////////////前
var OnOff = true;


$("#Pro").on('mouseover', '.img2', function () {
    $(this).css("opacity", "0")
});
$("#Pro").on('mouseout', '.img2', function () {
    $(this).css("opacity", "1")
});
///收藏
$("#Pro").on('click', 'span', function () {
    if (OnOff) {
        // var id = 1;
        var proid = $(this).parent().parent().attr("proid");
        $.ajax({
            type: "post",
            url: "/Prcol.do",
            async: true,
            dataType: "json",
            data: { proid: proid },
            success: function () {

            }
        });
        $("#success").text("收藏成功");
        // $("#success").animate({ top: "40%" }, 1000, function () {
        //     setTimeout(function () {
        //         $("#success").animate({ top: "-40%" }, 1000)
        //     }, 1000)
        // });
        setTimeout(function () {
            animateLY($("#success")[0], { "zIndex": 999, "top": 200, "opacity": 100 }, function () {
                setTimeout(function () {
                    animateLY($("#success")[0], { "top": 120, "opacity": 0 }, function () {
                        $("#success").css({ "zIndex": -999 });
                    })
                }, 100)
            });
        }, 200)
        $(this).html("&#xe7cd;");
        OnOff = false
    } else {
        $("#success").text("取消收藏成功");
        setTimeout(function () {
            animateLY($("#success")[0], { "zIndex": 999, "top": 200, "opacity": 100 }, function () {
                setTimeout(function () {
                    animateLY($("#success")[0], { "top": 120, "opacity": 0 }, function () {
                        $("#success").css({ "zIndex": -999 });
                    })
                }, 100)
            });
        }, 200)
        $(this).html("&#xe601;");
        OnOff = true
    }
});

var a = $("#show").html();
$(".Kind").click(function () {
    $(".Kind").css("background-color", "white");
    $(this).css("background-color", "#f5f5f5f5");
    var t = $(this).text();
    // var k=$(".Kind");
    // console.log(k[1]);
    // for(var n=0;n<k.length;n++){
    //      k[n].text()
    // }
    a += t + "/";
    $("#show").html(a)
});
$(".SHeight").click(function () {
    $(".SHeight").css("background-color", "white");
    $(this).css("background-color", "#f5f5f5f5");
    var t = $(this).text();
    a += t;
    $("#show").html(a);
});
$(".SPrice").click(function () {
    $(".SPrice").css("background-color", "white");
    $(this).css("background-color", "#f5f5f5f5");
    var t = $(this).text();
    a += t;
    $("#show").html(a)
});


//缓动动画
function animateLY (obj, json, fn) {
    // 第一参数 动的对象   2  attr  动的那个属性   3   属性值少多少
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;  //  用来判断是否停止定时器   定时器的里面
        //  每隔 30 毫秒就要运行一次
        for (var k in json) {  // k 属性     json[k] 是属性值
            var leader = 0;
            // 因为透明度是 小数   取值 0~1 之间    第二个  它没有单位
            if (k == "opacity") {
                leader = Math.round(getStyle(obj, k) * 100) || 100;
            }
            else {
                leader = parseInt(getStyle(obj, k)) || 0;
            }
            var step = (json[k] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (k == "opacity") {
                obj.style.opacity = leader / 100;
                obj.style.filter = "alpha(opacity = " + leader + ")";
            }

            else if (k == "zIndex") {
                obj.style.zIndex = json[k];
            }
            else {
                obj.style[k] = leader + "px";
            }
            if (leader != json[k]) {

                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {   // 如果有函数传递过来  ， 定时器结束了，说明动画结束  可以执行 回调函数
                fn();   // 执行函数  fn + ();
            }
        }
    }, 35)
}

//获取最终样式
function getStyle (obj, attr) {
    if (obj.currentStyle) {

        return obj.currentStyle[attr];
    }
    else {
        return window.getComputedStyle(obj, null)[attr];
    }
}