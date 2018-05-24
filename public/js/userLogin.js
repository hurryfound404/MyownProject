/**
 * Created by Administrator on 2018/4/6.
 */


$(function () {
    var booleanuser = true;
    $("#DL").on("click", function () {
        console.log(111)
        var name = $("#YH").val();
        var pwd = $("#M").val();
        if(true){
            console.log(222)
            booleanuser = false;
            $.ajax({
                type:"get",
                data:{
                    username:name,
                    password:pwd
                },
                url: "/login.do",
                dataType: 'text', // !!!!
                success: function(ajaxObj){
                    console.log(ajaxObj);
                    booleanuser = true;
                    if(ajaxObj ==="ok"){
                        window.location.href = "../index.html";
                    }else{
                        //alert("请重新输入！")
                        animateLY($("#user-tip-w")[0], { "zIndex": 999, "top": 200, "opacity": 100 }, function () {
                            setTimeout(function () {
                                animateLY($("#user-tip-w")[0], { "top": 120, "opacity": 0 }, function () {
                                    $("#user-tip-w").css({ "zIndex": -999 });
                                })
                            }, 500)
                        });
                    }
                }

            })




        }

    })






})