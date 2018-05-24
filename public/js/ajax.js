/**
 * Created by ½Ý×à´óÊ¦ on 2018/3/14.
 */
function ajaxFn(obj){
    var httpRequest;
    if(window.XMLHttpRequest){
        httpRequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httpRequest=new ActiveXObject("Microsoft.XMLHttp");
    }
    //console.log(httpRequest);
    httpRequest.onreadystatechange=function(){
        if(httpRequest.readyState==4&&httpRequest.status==200){
            obj.callback(httpRequest);
        }
    };
    if(obj.method=="get"&&obj.param.length>0){
        obj.url=obj.url+'?'+obj.param;

    }
    httpRequest.open(obj.method,obj.url);
    if(obj.method=='post'){
         httpRequest.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
         httpRequest.send(obj.param);
    } else{
        httpRequest.send(null);
    }

}