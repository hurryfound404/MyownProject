/**
 * Created by admin on 2018-04-02.
 */

    $(function () {
        $("#zfbImg-cxx").on("click",function () {
            $.ajax({
                type: "get",
                url: "/orderpaysuccess.do",
                success: function (ajaxObj) {
                    if (ajaxObj == "ok") {
                        window.location.href = "paymentSuccess.html";
                    }
                }

            })
        })
        $("#wxImg-cxx").on("click",function () {
            $.ajax({
                type: "get",
                url: "/orderpaysuccess.do",
                success: function (ajaxObj) {
                    if (ajaxObj == "ok") {
                        window.location.href = "paymentSuccess.html";
                    }
                }

            })
        })
        $("#ylImg-cxx").on("click",function () {
            $.ajax({
                type: "get",
                url: "/orderpaysuccess.do",
                success: function (ajaxObj) {
                    if (ajaxObj == "ok") {
                        window.location.href = "paymentSuccess.html";
                    }
                }

            })
        })

        var p1=$("#InP-cxx1");
        var p2=$("#InP-cxx2");
        var p3=$("#InP-cxx3");
//if(p3.attr("checked",true)){
//    $("#ylImg-cxx").css("visibility","visible")
//
//}
        p1.click(function(){
            //p1.attr("checked",true);
            if(p1.attr("checked",true)){
                $("#zfbImg-cxx").css("visibility","visible");
                $("#ylImg-cxx").css("visibility","hidden");
                $("#wxImg-cxx").css("visibility","hidden")
            }
        });
        p2.click(function(){
            p2.attr("checked",true);
            if(p2.attr("checked",true)){
                $("#wxImg-cxx").css("visibility","visible");
                $("#ylImg-cxx").css("visibility","hidden");
                $("#zfbImg-cxx").css("visibility","hidden")
            }
        });
        p3.click(function(){
            p3.attr("checked",true);
            if(p3.attr("checked",true)){
                $("#ylImg-cxx").css("visibility","visible")
            }
        });


    })





