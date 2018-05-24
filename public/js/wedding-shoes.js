/**
 * Created by Administrator on 2018/4/3.
 */


$(function () {
    $('.goDz').on('click',function () {
        window.location.href = 'customization.html'
    })

    $("img.lazy").lazyload({
        effect: "fadeIn",// 载入使用何种效果
        threshold: 200 // 提前开始加载
    });

    $(window).scroll(function(){
        console.log(scrollY);
        if($(window).scrollTop()>=170){
            $(".First-body").css({"left":"0px","opacity":1});
        }
        if($(window).scrollTop()>=777){
            $(".Second-body").css({"left":"0px","opacity":1});
        }
        if($(window).scrollTop()>=1335){
            $(".Third-body").css({"top":"0px","opacity":1});
        }
    })
    $('header').hide();
    $('contents').hide();
    $('footer').hide();
    window.onload = function () {
        setTimeout(() => {
            $('#loading').addClass('animated zoomOutDown');
            $('header').show();
            $('contents').show();
            $('footer').show();
        }, 1200);
    }
})

