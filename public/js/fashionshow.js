    //��̬ҳ��hoverЧ��  ���߱䳤
    $(".txtLeft>p").mouseover(function () {
        $(".txtLeft>div").css("width","220px")
    } ).mouseout(function () {
        $(".txtLeft>div").css("width","0px")
    } );
    $(".txtRight>p").mouseover(function () {
        $(".txtRight>div").css("width","260px")
    } ).mouseout(function () {
        $(".txtRight>div").css("width","0px")
    } );
    //// ���������¼� ��̬ҳ��Ч�� sectionTwo�����ͼƬ�ſ�
    $(window).scroll(function(){
        if(scrollY>400){
            $('.picbtm') .css("top","210px");
            $('.picleft') .css("marginLeft","0px");
            $('.sectionTwo') .css("opacity","1");
            $('.pictop') .css("top","520px");
            $('.picright') .css("right","0px")
        }
        if(scrollY>2400){
            $('.cc') .css("opacity","1");
            $('.dd') .css("opacity","1");
            $('.txtRight') .css("left","330px");
            $('.dd>img') .css("right","-75px");
            $('.txtLeft') .css("left","420px");
            $('.cc>img') .css("margin-left","0");
        }


    });

    $("img.lazy").lazyload({
        effect: "show",// ����ʹ�ú���Ч��
        threshold: 50 // ��ǰ��ʼ����
    });

    $('header').hide();
    $('section').hide();
    $('footer').hide();
    window.onload = function () {
        setTimeout(() => {
            $('#loading').addClass('animated zoomOutDown');
            $('header').show();
            $('section').show();
            $('footer').show();
        }, 1200);
    }