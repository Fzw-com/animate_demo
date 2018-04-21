/**
 * Created by Administrator on 2016/5/18.
 */
// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
window.onload=function(){
    function fnLoad(){
        var iTime=new Date().getTime();
        var oW=id('welcome');
        var oImgLoad=true;//获取图片加载时间，没写，直接默认加载完成
        var bTimer=false;
        var oTimer=null;
        var oPicList=id('picList');
        var aA=document.getElementsByTagName('nav')[0].children;
        oPicList.style.width=aA.length*100+'%';

        bind(oW,'webkitTransitionEnd',end);
        bind(oW,'transitionend',end);

        oTimer=setInterval(function(){
            if(new Date().getTime()-iTime>=5000){
                bTimer=true;
            }
            if(bTimer && oImgLoad){
                clearInterval(oTimer);
                oW.style.opacity=0;
            }
        },1000);

        function end(){
          removeClass(oW,'pageShow');
            fnTab();
        }
    }
    fnLoad();

    bind(document,'touchmove',function(ev){
        ev.preventDefault();
    });//阻止默认事件

    function fnTab(){
        var oTabPic=id('tabPic');
        var oPicList=id('picList');
        var oPicMask=id('oPicMask');
        var oTimer=null;
        var aA=document.getElementsByTagName('nav')[0].children;
        var iNow=0;
        var iX=0;
        var iStouchStart=0;
        var iStart=0;
        autoPlay();


    function autoPlay(){
        oTimer=setInterval(function(){
            iNow++;
            iNow=iNow%aA.length;
            tab();
        },2000);

    }

    function tab(){
        iX=-iNow*view().w;
        oPicList.style.transition="0.5s";
        oPicList.style.WebkitTransform=oPicList.style.transform="translateX("+iX+"px)";

        for(var i=0;i<aA.length;i++){
            removeClass(aA[i],'active');
        }
        addClass(aA[iNow],"active");
    }

        bind(oTabPic,'touchstart',fnStart);
        bind(oTabPic,'touchmove',fnMove);
        bind(oTabPic,'touchend',fnEnd);

        function fnStart(ev){
            ev=ev.changedTouches[0];
            oPicList.style.transition=0;
            clearInterval(oTimer);
            iStouchStart=ev.pageX;
            iStart=iX;
        }

        function fnMove(ev){
            ev=ev.changedTouches[0];
            var dis=ev.pageX-iStouchStart;
            iX=iStart+dis;
            oPicList.style.WebkitTransform=oPicList.style.transform="translate("+iX+"px)";
        }

        function fnEnd(){
            iNow=iX/view().w;
            iNow=-Math.round(iNow);

            if(iNow<0){
                iNow=0;
            }
            if(iNow>aA.length-1){
                iNow=aA.length-1;
            }
            tab();
            autoPlay();
        }

    }


    //评分效果
    function fnGrad(){
        var oUl=id('gradList');
        var aLi=oUl.getElementsByTagName('li');
        var aInp=oUl.getElementsByTagName('input');
        var arr=['很不好','不好','一般','好','很好'];

        for(var i=0;i<aLi.length;i++){
             fn(aLi[i],aInp[i]);
        }

        function fn(oLi,oInp){

           var aA=oLi.getElementsByTagName('a');

            for(var i=0;i<aA.length;i++){
                aA[i].index=i;

                bind(aA[i],'touchstart',function(){
                    for(var i=0;i<aA.length;i++){
                        if(i<=this.index){
                            addClass(aA[i],'active');
                        }
                        else{
                            removeClass(aA[i],'active');
                        }
                        oInp.value=arr[this.index];
                    }
                });
            }

        }

    }
    fnGrad();

    //提交按钮
    fnBtn();
    function fnBtn(){
        var oBtn=id('btn');
        var oP=id('info');
        bind(oBtn,'touchend',fnEnd);

        function fnEnd(){

            if(fnScore()){

                if(fnTab()){

                    fnMask();

                }else{
                    fnInfo(oP,'请给景区添加标签');
                    //alert(fnTab());
                }

            }else{
               fnInfo(oP,'请给景区评分');
            }
        }

        function fnInfo(obj,sInfo){
            obj.innerHTML=sInfo;
            obj.style.WebkitTransform=obj.style.transform='scale(1)';
            obj.style.opacity=1;

            setTimeout(function(){
                obj.style.WebkitTransform=obj.style.transform='scale(0)';
                obj.style.opacity=0;
            },2000);
        }
        function fnScore(){
            var oList=id('gradList');
            var aInp=oList.getElementsByTagName('input');

            for(var i=0;i<aInp.length;i++){
                if(aInp[i].value==0){
                    return false;
                }
            }
                return true;
        }

        function fnTab(){
            var oTags=id('tags');
            var aInp=oTags.getElementsByTagName('input');

            for(var i=0;i<aInp.length;i++){
                if(aInp[i].checked){
                    return true;
                }
            }
            return false;
        }

        function fnMask(){
            var oMask=id('mask');
            var oIndex=id('index');
            var oNew=id('news');

            addClass(oMask,'pageShow');
            addClass(oNew,'pageShow');

            setTimeout(function(){
                oMask.style.opacity=1;
                oIndex.style.WebkitFilter=oIndex.style.filter='blur(5px)';
            },14);

            setTimeout(function(){
                oNew.style.transition='0.5s';
                oMask.style.opacity=0;
                oIndex.style.WebkitFilter=oIndex.style.filter='blur(0)';
                oNew.style.opacity=1;
                removeClass(oMask,"pageShow");
                removeClass(oMask,"pageShow");
            },3000);

        }
        //上传视频
        function fnNews(){
            var iNew=id('news');
            var aInp=iNew.getElementsByTagName('input');
            var oInfo1=id('info1');

            aInp[0].onchange=function(){
                //files是获取上传文件的属性值
                if(this.files[0].type.split('/')[0]=='video'){
                    newsOut();
                }
                else{
                    fnInfo(oInfo1,'请上传视频');
                    this.value='';
                }
            };
            aInp[1].onchange=function(){
                //files是获取上传文件的属性值
                if(this.files[0].type.split('/')[0]=='image'){
                    newsOut();
                }
                else{
                    fnInfo(oInfo1,'请上传图片');
                    this.value='';
                }
            };
        }
        fnNews();
        function newsOut(){
            var iNew=id('news');
            var oForm=id('form');
            iNew.style.opacity=0;
            addClass(oForm,'pageShow');
            removeClass(iNew,'pageShow');

        }

    }

    //提交效果
    function formIn(){
        var oForm=id('form');
        var oOver=id('over');
        var aFormTag=id('formTags').getElementsByTagName('label');
        var oBtn=oForm.getElementsByClassName('btn')[0];
        var bOff=false;

        for(var i=0;i<aFormTag.length;i++){
            bind(aFormTag[i],'touchend',function(){
               bOff=true;
                addClass(oBtn,'submit');
            });

            bind(oBtn,'touchend',function(){
                if(bOff){
                    for(var i=0;i<aFormTag.length;i++){
                        aFormTag[i].getElementsByTagName('input')[0].checked=false;
                    }
                    bOff=false;
                    addClass(oOver,'pageShow');
                    removeClass(oForm,'pageShow');
                    removeClass(oBtn,'submit');
                }
            });
        }
    }
    formIn();

    //重新评论
    function reComment(){
        var oOver=id('over');
        var oIndex=id('index');
        var oInp=oOver.getElementsByClassName('btn')[0];

        bind(oInp,'touchend',function(){
           removeClass(oOver,'pageShow');
           addClass(oIndex,'pageShow');
        });
    }
    reComment();
};

