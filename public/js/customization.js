//��ʽ
$(".btn1").on("click",function(){
    $(".pattern").show();
    $(".right").hide();
});
$(".close1").on("click",function(){
    $(".pattern").hide();
    $(".right").show();
});
//����
$(".btn2").on("click",function(){
    $(".braces").show();
    $(".right").hide();
});
$(".close2").on("click",function(){
    $(".braces").hide();
    $(".right").show();
});
//�ż�����
$(".btn3").on("click",function(){
    $(".tiptoe").show();
    $(".right").hide();
});
$(".close3").on("click",function(){
    $(".tiptoe").hide();
    $(".right").show();
});
//Ь��
$(".btn4").on("click",function(){
    $(".heel").show();
    $(".right").hide();
});
$(".close4").on("click",function(){
    $(".heel").hide();
    $(".right").show();
});
//װ��
$(".btn5").on("click",function(){
    $(".decorate").show();
    $(".right").hide();
});
$(".close5").on("click",function(){
    $(".decorate").hide();
    $(".right").show();
});
//��ɫ
$(".btn6").on("click",function(){
    $(".hue").show();
    $(".right").hide();
});
$(".close6").on("click",function(){
    $(".hue").hide();
    $(".right").show();
});
//���Ի�
$(".btn7").on("click",function(){
    $(".embellish").show();
    $("#box ").show();
    $(".right").hide();
});
$(".close7").on("click",function(){
    $(".embellish").hide();
    $("#box ").hide();
    $(".right").show();
});
//��ʽ
$(".pattern-div").on("click",function(){
    var patternDiv = $(".pattern-div");
    patternDiv.css("outline","none") ;
    $(this).css("outline","1px solid #b28b60");
});
$(".pattern-img1").on("click",function(){
    $(".left-img").attr("src","images/customs/1-1.png")
});
$(".pattern-img2").on("click",function(){
    $(".left-img").attr("src","images/customs/3.png")
});
$(".pattern-img3").on("click",function(){
    $(".left-img").attr("src","images/customs/4.png")
});
//����
$(".braces-div").on("click",function(){
    var bracesDiv = $(".braces-div");
    bracesDiv.css("outline","none") ;
    $(this).css("outline","1px solid #b28b60");
});
$(".braces-img1").on("click",function(){
    $(".left-img").attr("src","images/customs/1-1.png")
});
$(".braces-img2").on("click",function(){
    $(".left-img").attr("src","images/customs/5.png")
});
$(".braces-img3").on("click",function(){
    $(".left-img").attr("src","images/customs/6.png")
});
//�ż�����
$(".tiptoe-div").on("click",function(){
    var tiptoeDiv = $(".tiptoe-div");
    tiptoeDiv.css("outline","none") ;
    $(this).css("outline","1px solid #b28b60");
});
$(".tiptoe-img1").on("click",function(){
    $(".left-img").attr("src","images/customs/1-1.png")
});
$(".tiptoe-img2").on("click",function(){
    $(".left-img").attr("src","images/customs/2.png")
});
$(".tiptoe-img3").on("click",function(){
    $(".left-img").attr("src","images/customs/8.png")
});
//Ь����ʽ
$(".heel-div").on("click",function(){
    var heelDiv = $(".heel-div");
    heelDiv.css("outline","none") ;
    $(this).css("outline","1px solid #b28b60");
});
$(".heel-img1").on("click",function(){
    $(".left-img").attr("src","images/customs/1-1.png")
});
$(".heel-img2").on("click",function(){
    $(".left-img").attr("src","images/customs/9.png")
});
$(".heel-img3").on("click",function(){
    $(".left-img").attr("src","images/customs/10.png")
});
//װ��
$(".decorate-div").on("click",function(){
    var decorateDiv = $(".decorate-div");
    decorateDiv.css("outline","none") ;
    $(this).css("outline","1px solid #b28b60");
});
$(".decorate-img1").on("click",function(){
    $(".left-img").attr("src","images/customs/1-1.png")
});
$(".decorate-img2").on("click",function(){
    $(".left-img").attr("src","images/customs/12.png")
});
$(".decorate-img3").on("click",function(){
    $(".left-img").attr("src","images/customs/11.png")
});
//��ɫ����
$(".panel-div").on("click",function(){
    var panelDiv = $(".panel-div");
    panelDiv.css("border","none") ;
    $(this).css("border","1px solid #b28b60");
});
$(".white1").on("click",function(){
    $(".left-img").attr("src","images/customs/11.png")
});
$(".red1").on("click",function(){
    $(".left-img").attr("src","images/customs/97.png")
});
$(".white2").on("click",function(){
    $(".left-img").attr("src","images/customs/97.png")
});
$(".red2").on("click",function(){
    $(".left-img").attr("src","images/customs/98.png")
});
$(".white3").on("click",function(){
    $(".left-img").attr("src","images/customs/98.png")
});
$(".red3").on("click",function(){
    $(".left-img").attr("src","images/customs/99.png")
});
//360
$(".left").on("mousedown",function(){
    $(".left").hide();
    $(".menu").show();
    $(".zuo").hide();
    $(".you").hide();
    $(".tuo").hide();
});
$(".menu").on("mouseup",function(){
    $(".left").show();
    $(".menu").hide();
    $(".zuo").show();
    $(".you").show();
    $(".tuo").show();
});
$(function(){
    var list=$(".list");
    var pic_X=list.offset().left;
    var pic_Y=list.offset().top;
    var pic_W=list.width()/2;
    var pic_H=list.height()/2;
    var center_X=pic_X+pic_W;
    var center_Y=pic_Y+pic_H;
    var movestop=pic_W/10;
    list.mousemove(function(event){
        var mouse_X=event.pageX;
        var mouse_Y=event.pageY;
        if(mouse_X-center_X<=0){
            moveImg(mouse_X,mouse_Y,'left')
        }else{
            moveImg(mouse_X,mouse_Y)
        }
    });
    function moveImg(m_X,m_Y,dir){
        var index=Math.ceil(Math.abs(m_X-center_X)/movestop);
        if(dir){
            $('.list li').eq(index).show().siblings().hide();
        }else{
            $('.list li').eq(18-index).show().siblings().hide();
        }
    }
});
//ͼƬ��ק�Ŵ�/**
//* author levi
//* url http://levi.cg.am
//    */
$(function() {
    $(document).mousemove(function(e) {
        if (!!this.move) {
            var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
                callback = document.call_down || function() {
                        $(this.move_target).css({
                            'top': e.pageY - posix.y,
                            'left': e.pageX - posix.x
                        });
                    };

            callback.call(this, e, posix);
        }
    }).mouseup(function(e) {
        if (!!this.move) {
            var callback = document.call_up || function(){};
            callback.call(this, e);
            $.extend(this, {
                'move': false,
                'move_target': null,
                'call_down': false,
                'call_up': false
            });
        }
    });

    var $box = $('#box').mousedown(function(e) {
        var offset = $(this).offset();

        this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
        $.extend(document, {'move': true, 'move_target': this});
    }).on('mousedown', '#coor', function(e) {
        var posix = {
            'w': $box.width(),
            'h': $box.height(),
            'x': e.pageX,
            'y': e.pageY
        };

        $.extend(document, {'move': true, 'call_down': function(e) {
            $box.css({
                'width': Math.max(30, e.pageX - posix.x + posix.w),
                'height': Math.max(30, e.pageY - posix.y + posix.h)
            });
        }});
        return false;
    });
});
//��������Ĭ����ʽ
$('body').bind("selectstart", function () { return false; });

