/**
 * Created by Administrator on 2018/4/8.
 */
$(function () {
    let chooseAddress;
    let choosePack;
    let chooseCoupon = 0;
    var toggle = false;
    var bjaddrid;//记录编辑ID
    $(".Jt").click(function(){
        if(toggle==false){
            $(".Jt")[0].className = "Jt tr180";
            $(".coupons_copy").css("display","block");
            toggle = true;
        }else {
            $(".coupons_copy").css("display","none");
            $(".Jt")[0].className = "Jt tr0";
            toggle = false;
        }
    });
    $("#go-spcar").on("click", function () {
        window.location.href = "shoppingCar.html";
    })

    //添加地址
    $("#append").click(function(){
        $(".appendXinXi").css("display","block");
        $(".zhezhao").css("display","block");
    });
    //取消添加地址
    $(".appendXinXi_X").click(function(){
        $(".appendXinXi").css("display","none");
        $(".bianjiborder").css("display","none");
        $(".zhezhao").css("display","none");
        $(".appendXinXi input").val("");
        $(".appendXinXi textarea").val("");
        $(".appendXinXi select option:first-child").prop("selected", "selected");
    });
    //添加保存
    $("#add-baoCunButton").click(function(){
        var newAddr = {};
        newAddr.name = $(".appendXinXi_inputone input").val();
        newAddr.tell = $(".appendXinXi_inputtwo input").val();
        newAddr.sf = $("#s_province").val();
        newAddr.city = $("#s_city").val();
        newAddr.carea = $("#s_county").val();
        newAddr.detail = $(".appendXinXi textarea").val();
        if($(".shezhi input").is(':checked')){
            newAddr.default = 1;
        }else{
            newAddr.default = 0;
        }
        console.log(newAddr);
        //if(useraddrPd(newAddr)){
        //}
        $.ajax({
            type: "get",
            url: "/adduseraddress.do",
            data:{
                newaddr:newAddr
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                if(ajaxObj == "ok"){
                    gxuserAddr();
                    $(".appendXinXi input").val("");
                    $(".appendXinXi textarea").val("");
                    $(".appendXinXi select option:first-child").prop("selected", "selected");
                    //console.log($(".appendXinXi select option:first-child"));

                    $(".appendXinXi").css("display","none");
                    $(".bianjiborder").css("display","none");
                    $(".zhezhao").css("display","none");
                }
            }
        })

    });
    //$(".appendXinXi input").on("blur", function () {
    //    if($(this).val()!=""){
    //        $(this).css("border-color","#aaa");
    //    }else{
    //        $(this).css("border-color","red");
    //    }
    //})
    //function useraddrPd(obj){
    //    if(obj.name ==""){
    //        $(".appendXinXi_inputone input").css("border-color","red");
    //        return false
    //    }
    //}
    //
    $(".bianjiborder_X").click(function(){
        $(".bianjiborder").css("display","none");
        $(".zhezhao").css("display","none");
    });

    //编辑地址
    $("#information_address-box").on("click",".information_address_bianji", function () {
        bjaddrid = $(this).parents(".information_address").attr("addrid");
        $.ajax({
            type: "get",
            url: "/getaddr.do",
            data:{
                addrid:$(this).parents(".information_address").attr("addrid")
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                $(".bianjiborder_inputone input").val(ajaxObj[0].addr_sh_user);
                $(".bianjiborder_inputtwo input").val(ajaxObj[0].addr_sh_tel);
                $("#s_province1").val(ajaxObj[0].addr_pro);
                $("#s_city1").val(ajaxObj[0].addr_city);
                $("#s_county1").val(ajaxObj[0].addr_area);
                $(".bianjiborder textarea").val(ajaxObj[0].addr_detail);
                $(".bianjiborder").css("display","block");
                $(".zhezhao").css("display","block");
            }
        });
    })
    //确认编辑地址
    $("#update-bButton").on("click", function () {
        var bjAddr = {};
        bjAddr.name = $(".bianjiborder_inputone input").val();
        bjAddr.tell = $(".bianjiborder_inputtwo input").val();
        bjAddr.sf = $("#s_province1").val();
        bjAddr.city = $("#s_city1").val();
        bjAddr.carea = $("#s_county1").val();
        bjAddr.detail = $(".bianjiborder textarea").val();
        bjAddr.bjaddrid = bjaddrid;
        $.ajax({
            type: "get",
            url: "/updataUserAddress.do",
            data:{
                bjAddr:bjAddr
            },
            success: function (ajaxObj) {
                console.log(ajaxObj);
                if(ajaxObj == "ok"){
                    $(".information_address").each(function () {
                        if($(this).attr("addrid")==bjaddrid){
                            $(this).find(".information_address_word").html(bjAddr.name);
                            $(this).find(".information_address_phone").html(bjAddr.tell);
                            $(this).find(".information_address_name").html(bjAddr.sf+bjAddr.city+bjAddr.carea+bjAddr.detail);
                        }
                        $(".bianjiborder").css("display","none");
                        $(".zhezhao").css("display","none");
                    })
                }
            }
        })
    });
    //默认地址
    $("#information_address-box").on("click","input", function () {
        var gaddrid = $(this).parents(".information_address").attr("addrid");
        $.ajax({
            type: "get",
            url: "/defaultAddress.do",
            data:{
                gaddrid:gaddrid
            },
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                if(ajaxObj=="ok"){
                    $(".information_address").each(function () {
                        if($(this).attr("addrid")==gaddrid){
                            $(this).find("input").val("默认地址");
                            $(this).find("input")[0].className = "test1";
                        }else{
                            $(this).find("input").val("设置默认地址");
                            $(this).find("input")[0].className = "test2";
                        }
                    });
                    //console.log(chooseAddress);
                }
            }
        });
    })



    chooseAddress = $(".information_address-choose").attr("addrid");
    choosePack = $(".Bz-choose").attr("pkid");
    //地址选择
    $("#information_address-box").on("click",".information_address", function () {
        $(this).addClass("information_address-choose").siblings(".information_address").removeClass("information_address-choose");
        ofAddress();
    });

    //包装盒选择
    $("#bz-box").on("click",".Bz", function () {
        $(this).addClass("Bz-choose").siblings(".Bz").removeClass("Bz-choose");
        ofPack();
        ofallprice();
    });

    //优惠券选择
    $("#coupons-box").on("click",".coupons-li", function () {
        $(this).addClass("coupons-li-choose").siblings(".coupons-li").removeClass("coupons-li-choose");
        ofcoupons();
        ofallprice();
    });


    //改变地址
    function ofAddress(){
        $(".information_address").each(function () {
            if($(this).hasClass("information_address-choose")){
               $(".queRenDingDan_peiSong_one i").html($(this).find(".information_address_name").html());
                $(".queRenDingDan_peiSong_two i").html($(this).find(".information_address_word").html());
                $(".queRenDingDan_peiSong_three i").html($(this).find(".information_address_phone").html());
                chooseAddress = $(this).attr("addrid");
            }
        })
    };

    //提交到订单确认
    $("#tj-dd").on("click", function () {
        var tjdata = {};
        tjdata.chooseAddressid = chooseAddress;
        tjdata.choosePackid = choosePack;
        tjdata.chooseCouponid = chooseCoupon;
        tjdata.paytype = "在线支付";
        tjdata.remark = "";
        tjdata.allnum = $(".queRenDingDan_one_word span").text();
        tjdata.allprice = $(".queRenDingDan_countCopy_word i").text();
        var timely = new Date();
        var now=timely.getFullYear()+p(timely.getMonth()+1)+p(timely.getDate())+p(timely.getHours())+p(timely.getMinutes())+p(timely.getSeconds());
        tjdata.time =timely.getFullYear()+"-"+p(timely.getMonth()+1)+"-"
        +p(timely.getDate())+"-"+p(timely.getHours())+"-"+p(timely.getMinutes())+"-"+p(timely.getSeconds());
        tjdata.bh = now;

        if($(".Select_box input").is(':checked')){
            tjdata.bill = 1;
        }else{
            tjdata.bill = 0;
        }

        $.ajax({
            type: "get",
            url: "/getuserorder.do",
            data:{
                tjdata:tjdata
            },
            success: function (ajaxObj) {
                if(ajaxObj=="ok"){
                    window.location.href = "Buy-PayP.html";
                }
            }
        })

    })

    //改变包装盒
    function ofPack(){
        $(".Bz").each(function () {
            if($(this).hasClass("Bz-choose")){
                $(".queRenDingDan_baoZhuang_word span").html($(this).find(".bz-price").html());
                choosePack = $(this).attr("pkid");
            }
        })
    };

    //改变优惠券
    function ofcoupons(){
        $(".coupons-li").each(function () {
            if($(this).hasClass("coupons-li-choose")){
                $(".queRenDingDan_yh_word span").html($(this).find(".coupons-li-price").html());
                chooseCoupon = $(this).attr("cpid");
            }
        })
    };

    //改变总价
    function ofallprice(){
        var allprice = parseFloat($(".queRenDingDan_two_word span").html())   +parseFloat($(".queRenDingDan_baoZhuang_word span").html())-parseFloat($(".queRenDingDan_yh_word span").html());
        allprice = toDecimal2(allprice);
        //console.log(allprice);
        $(".queRenDingDan_count_word span").html(allprice);
        $(".queRenDingDan_countCopy_word i").html(allprice);
        //console.log(chooseAddress,choosePack,chooseCoupon);
    };

    //2位小数
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

    //跟新地址
    function gxuserAddr(){
        $.ajax({
            type: "get",
            url: "/gxuseraddr.do",
            success: function (ajaxObj) {
                //console.log(ajaxObj);
                if(ajaxObj){
                    $("#information_address-box").html("");
                    var str ="";
                    for(var i=0;i<ajaxObj.length;i++){
                        if(i==0){
                            str +='<div class="information_address information_address-choose" addrid="'+ajaxObj[i].addr_id+'">'+
                                '<p class="information_address_word">'+ajaxObj[i].addr_sh_user+'</p>'+
                                '<p class="information_address_name">'+ajaxObj[i].addr_pro+ajaxObj[i].addr_city+ajaxObj[i].addr_area+ajaxObj[i].addr_detail+'</p>'+
                                '<p class="information_address_phone">'+ajaxObj[i].addr_sh_tel+'</p>'+
                                '<input type="button" class="test1" value="默认地址"/>'+
                                '<p class="information_address_bianji">编辑</p>'+
                            '</div>'
                        }else{
                            str +='<div class="information_address" addrid="'+ajaxObj[i].addr_id+'">'+
                            '<p class="information_address_word">'+ajaxObj[i].addr_sh_user+'</p>'+
                            '<p class="information_address_name">'+ajaxObj[i].addr_pro+ajaxObj[i].addr_city+ajaxObj[i].addr_area+ajaxObj[i].addr_detail+'</p>'+
                            '<p class="information_address_phone">'+ajaxObj[i].addr_sh_tel+'</p>'+
                            '<input type="button" class="test2" value="设置默认地址"/>'+
                            '<p class="information_address_bianji">编辑</p>'+
                            '</div>'
                        }
                        }
                    $("#information_address-box").html(str);
                    }
                }
            })
    }

    function p(s) {
        return s < 10 ? '0' + s: s;
    }


    //var now=new Date().getFullYear()+p(new Date().getMonth()+1)+p(new Date().getDate())+p(new Date().getHours())+p(new Date().getMinutes());
    //console.log(now);

})