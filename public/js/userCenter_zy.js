let colletionId=[];
window.onload=function () {
    moveMoter_zy();
};
// 页面载入时模特出现
function moveMoter_zy() {
    $(".moterP_zy").css({"left":"400px","opacity":"1"});
    $(".moterText_zy").css({"top":"150px"});
    $(".moterText_zy>img").css({"opacity":"1"})
}
// 添加地址 弹出 模态框
function massageAction() {
    $(".message_div_zy").css({"display":"block"});
    $(".hiddenBody").css("display","block");
}
// 添加地址 退出 模态框
$(".exsitMessage").click(function () {
    $(".message_div_zy").css({"display":"none"});
    $(".hiddenBody").css("display","none");
});
// 购物车  弹出 是否确定删除 模态框
// $(".deletButton_zy").click(function(){
//     $(".massageSure").css({"display":"block"});
//     $(".hiddenBody").css("display","block");
// });
// 个人收藏加入购物车 弹出  操作成功 模态框
$(".addToCar").click(function(){
    $(".massageSucsess").css({"display":"block"});
    $(".hiddenBody").css("display","block");
});
// 退出 确认删除 模态框
$(".exsitSureMassage").click(function(){
    $(".massageSure").css({"display":"none"});
    $(".hiddenBody").css("display","none");
    // 当点击确定按钮后发出请求把收藏id传出去------这是删除收藏AJAX请求
    $.ajax({
        // dataType:"JSON",
        type:"get",
        url:"deletUserLike.do",
        data:{
            colleId:colletionId
        },
        success:function(res){
            console.log(res)
            // if(res=="ok"){
            //       window.refresh();
            // }else{
            //       alert('fail');
            // }
        }
    });
    colletionId = []
});
//  退出 操作成功 模态框
$(".confirmOk").click(function(){
    $(".massageSucsess").css({"display":"none"});
    $(".hiddenBody").css("display","none");
});
//搜索功能
$(".carSelectInpute_zy").keyup(function () {
    $(".tables_zy table tbody tr").stop().hide() //将tbody中的tr都隐藏
        .filter(":contains('"+($(this).val())+"')").show(); //，将符合条件的筛选出来
});
// 个人中心订单条件筛选
$(".orderSelect").on("change",function () {
    let optionValue=$(".orderSelect option:selected").text();
    $(".tables_zy table tbody tr").stop().hide().filter(":contains('"+(optionValue)+"')").show();
});

// 全选功能
$(".selectAll").click(function() {
    $(".userOption>td>input").each(function(indext) {
        console.log($(".userOption>td>input"));

        if (this.checked == true) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    })
});

// 个人中心AJAX路由拦截请求------------------------------------------------------>
// 增加收货人地址功能
$("#SaveAdress").click(function(){
  let userName=$(".saveName").val();
  let userTel=$(".saveNumber").val();
  let userPro=$(".saveProvince option:selected").val();
  let usersCity=$(".saveCitys option:selected").val();
  let userArea=$(".saveArea option:selected").val();
  let userDetilAress=$(".saveUserDetiledress").val();
  $.ajax({
      // dataType:"JSON",
      type:"get",
      url:"addAdress.do",
      data:{
          addsUserName:userName,
          addUserTel:userTel,
          addUserPro:userPro,
          addUserCity:usersCity,
          addUserArea:userArea,
          addUserDetil:userDetilAress
      },
      success:function(res){
            console.log(res)
          // if(res=="ok"){
          //       window.refresh();
          // }else{
          //       alert('fail');
          // }
      }
  })

});
// 收藏删除 点击出现模态框的同时把收藏id=产品id加到数组里
$(".collection-tr").on("click",".deletButton_zy",function(){
    colletionId.push($(this).parents("tr").attr("colleid"));
    $(".massageSure").css({"display":"block"});
    $(".hiddenBody").css("display","block");
});
// 个人中心修改密码Ajax
$("#updatePwd").on("click",function(){
    let oldPwd=$(".oldPwd").val();
    let newPwd=$(".newPwd").val();
    let confirmPwd=$(".confirmPwd").val();
    if(newPwd!=confirmPwd){
        $(".changePwd_zy .confirmCompare").css("opacity","1");
    }else{
        $(".changePwd_zy i").css("opacity","0");

        $(".massageSucsess").css({"display":"block"});
        $(".hiddenBody").css("display","block");
     $(".updateOk").click(function(){
            $(".massageSucsess").css({"display":"none"});
            $(".hiddenBody").css("display","none");
            // 当密码匹配时发起ajax请求
            $.ajax({
                // dataType:"JSON",
                type:"get",
                url:"updatePwd.do",
                data:{
                    updateNewPwd:newPwd
                },
                success:function(res){
                    console.log(res);
                    if(res=="ok"){
                        window.location.href="personal-Load.html"

                    }else{
                          alert('fail');
                    }
                }
            })
        });
    }

});
// 个人中心输入旧密码是否为空判定
$(".newPwd").keyup(function(){
    let oldPwd=$(".oldPwd")
    if(oldPwd.val()==""){
      $(".changePwd_zy .oldCompare").css("opacity","1");
    }
    else{
      $(".changePwd_zy .oldCompare").css("opacity","0");
    }
});
// 个人中心编辑个人信息ajax
$(".addSave_zy").on("click",function(){
    let editUserName=$(".editUserName").val();
    let editLoginName=$(".editLoginName").val();
    let editUserSex=$(".editUserSex option:selected").val();
    let editPhone=$(".editPhone").val();
    let editMail=$(".editMail").val();
    // 点击弹出框
    $(".massageSucsess").css({"display":"block"});
    $(".hiddenBody").css("display","block");
    // 点击保存修改按钮发起ajax请求
    $.ajax({
        // dataType:"JSON",
        type:"get",
        url:"userEdit.do",
        data:{
            editUserName:editUserName,
            editLoginName:editLoginName,
            editUserSex:editUserSex,
            editPhone:editPhone,
            editMail:editMail
        },
        success:function(res){
            console.log(res);
            if(res=="ok"){
                window.location.href="userCenter_zy.html"

            }else{
                alert('fail');
            }
        }
    })

});
// 个人中心编辑收货地址功能
// 点击编辑弹出修改地址模态框并把地址卡片的值给input的placeholder
$(".editAddress_zy").click(function(){
    // 获取地址卡片p的值
    let editAddressId=$(this).attr("adressId");
    let addressUserName=($(this).parent().children(".adressUserName_zy").text());
    let addressUserdetail=$(this).parent().children(".adressUserAdress_zy").children(4).text();
    let addressUserPhone=($(this).parent().children(".adressUserNumber_zy").text());
    // 点击时弹出模态框
    console.log(addressUserdetail);
    $(".editMessage_div_zy").css({"display":"block"});
    $(".hiddenBody").css("display","block");
    // console.log(editAddressId);
    // 分别把地址卡片的值给模态框的placeholder
    $(".editName").attr("placeholder",addressUserName);
    $(".editNumber").attr("placeholder",addressUserPhone);
    $(".editDetil").attr("placeholder",addressUserdetail);

    // 把地址卡片的id给模态框
    $(".editMessage_div_zy").attr("addressMassage",editAddressId)

});
// 点击模态框保存按钮获取input的值并发起Ajax请求
// 编辑模态框退出
$(".exsitEditMessage").click(function () {
    let editAddressId=$(".editMessage_div_zy").attr("addressMassage")
    let editName=$(".editName").val();
    let editNumber=$(".editNumber").val();
    let editProvince=$(".editProvince option:selected").val();
    let editCitys=$(".editCitys option:selected").val();
    let editArea=$(".editArea option:selected").val();
    let editDetil=$(".editDetil").val();

    $(".editMessage_div_zy").css({"display":"none"});
    $(".hiddenBody").css("display","none");
    // 点击保存按钮后发起Ajax请求
    $.ajax({
        // dataType:"JSON",
        type:"get",
        url:"editAddress.do",
        data:{
            editAddressId:editAddressId,
            editName:editName,
            editNumber:editNumber,
            editProvince:editProvince,
            editCitys:editCitys,
            editArea:editArea,
            editDetil:editDetil,
        },
        success:function(res){
            if(res=="ok"){
                  window.refresh();
            }else{
                  alert('fail');
            }
        }
    })


});
//gk 购物车删除
$(".deletButton_zy").click(function () {
    var a=$(this).parent().parent();
    var scid=$(this).parent().parent().attr("scid");
    console.log(scid);
    $.ajax({
        type: "get",
        url: "/shopCdel.do",
        // async:true,
        data: {scid:scid},
        // dataType: "json",
        success: function(data){
            if(data=="ok"){
                console.log(a);
                a.remove()
            }
        }
    })
});

//群删
$("#pl").click(function () {

    var a=$(".userOption>td>input");
    var list=[];
    var b=[];
    for(var i=0;i<a.length;i++){
        if(a[i].checked==true){
            b.push($(a[i]));
            list.push($(a[i]).attr("scid"))
        }
    }
    $.ajax({
        type: "get",
        url: "/shopCdelA.do",
        data: {list:list},
        success:function (data) {
            if(data=="ok"){
                for(var k=0;k<b.length;k++){
                    b[k].parent().parent().remove()
                }
            }
        }
    });
});
















