
function ajaxFn (obj) {
    var xmlHttp;     //兼容
    if(window.XMLHttpRequest){
        xmlHttp=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    };
    xmlHttp.onreadystatechange=function () {
        if(xmlHttp.readyState==4 && xmlHttp.status==200){
            // console.log(xmlHttp.responseText);
            obj.callback(xmlHttp)
        }
    };
    // post方法
    // xmlHttp.open('post','/studel.do);
    // xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    // xmlHttp.send('id='+sid);
    if(obj.method=="get" && obj.param.length>0){
        obj.url=obj.url+"?"+obj.param
    }
    xmlHttp.open(obj.method,obj.url);
    if(obj.method=="post"){
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.send(obj.param);
    }else {
        xmlHttp.send(null);
    }
}