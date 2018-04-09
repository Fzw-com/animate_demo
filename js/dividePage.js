window.onload=function(){

    page({
        id:'div1',
        nowNum:7,
        allNum:10,
        callback:function(now,all){
            console.log('当前页：'+now+'总共页：'+all);
        }
    });

 /*   //滚动条控制其他元素
    var oDiv1=document.getElementById("div1");
    var oDiv2=document.getElementById("div2");
    var oImg=document.getElementsByTagName("img")[0];
    var iMaxTop=oDiv1.offsetHeight-oDiv2.offsetHeight;
    oDiv2.onmousedown=function(ev){
        var ev=ev || event;
        var disY=ev.clientY-this.offsetTop;
        document.onmousemove=function(ev){
            var ev=ev || event;
            T=ev.clientY-disY;
            if(T<0){
                T=0;
            }
            else if(T>iMaxTop){
                T=iMaxTop;
            }
            oDiv2.style.top=T+'px';
            var iScal=T/iMaxTop;
            oImg.style.height=500 * iScal +'px';
        }
        document.onmouseup=function(){
            document.onmouseup=document.onmousemove=null;
        }
        return false;
    }
*/
    //图片排序
    var oBtn1=document.getElementById('btn1');
    var oBtn2=document.getElementById('btn2');
    var oUl=document.getElementById('col');
    var aLi=oUl.getElementsByTagName('li');
    var arr=[];
    var arr1=[];
    var flag=true;
    var original=oUl.innerHTML;

    for(var i=0;i<aLi.length;i++){
        arr.push(i);
        arr1.push(i);
    }
    arr.sort(function(a,b){return b-a;});//从大到小
    arr1.sort(function(a,b){return 0.5-Math.random(b-a);});//随机

    oBtn1.onclick=function(){
        //console.log(1111111111)
        if(flag){
            for(var i=0;i<aLi.length;i++){
                oUl.appendChild(aLi[arr[i]]);
            }
        }
        else{
            oUl.innerHTML=original;
        }
        flag ? oBtn1.value='从小到大':oBtn1.value='从大到小';
        flag=!flag;
    }
    oBtn2.onclick=function(){
        for(var i=0;i<aLi.length;i++){
            oUl.appendChild(aLi[arr1[i]]);
        }
        flag = false;
    }
};
function page(opt){
    if(!opt.id){
        return false
    }
    var obj=document.getElementById('divide-div1');
    var nowNum=opt.nowNum || 1;
    var allNum=opt.allNum || 5;
    var callback=opt.callback || function(){};
    if(nowNum>=4 && allNum>=6){
        var oA=document.createElement('a');
        oA.href='#1';
        oA.innerHTML="首页";
        obj.appendChild(oA);
    }
    if(nowNum>=2){
        var oA=document.createElement('a');
        oA.href='#'+(nowNum-1);
        oA.innerHTML='上一页';
        obj.appendChild(oA);
    }
    if(allNum<=5){
        for(var i=1;i<allNum;i++){
            var oA=document.createElement('a');
            oA.href="#"+i;
            if(nowNum==i){
                oA.innerHTML=i;
            }
            else{
                oA.innerHTML='['+ i +']';
            }
            obj.appendChild(oA);
        }
    }
    else{
        for(var i=1;i<=5;i++){
            var oA=document.createElement('a');
            if(nowNum==1 || nowNum==2){
                oA.href='#'+i;
                if(nowNum==i){
                    oA.innerHTML=i;
                }
                else{
                    oA.innerHTML='['+i+']';
                }
            }
            else if((allNum-nowNum)==0 || (allNum-nowNum)==1){
                oA.href='#'+(allNum-5+i);
                if((allNum-nowNum)==0 && i==5){
                    oA.innerHTML=(allNum-5+i);
                }else if((allNum-nowNum)==1 && i==4){
                    oA.innerHTML=(allNum-5+i);
                }
                else{
                    oA.innerHTML='['+(allNum-5+i)+']';
                }
            }
            else{
                oA.href='#'+(nowNum-3+i);
                if(i==3){
                    oA.innerHTML=(nowNum-3+i);
                }
                else{
                    oA.innerHTML='['+(nowNum-3+i)+']';
                }
            }
            obj.appendChild(oA);
        }

    }
    if((allNum-nowNum>=0)){
        var oA=document.createElement('a');
        oA.href='#'+(nowNum+1);
        oA.innerHTML='下一页';
        obj.appendChild(oA);
    }
    if((allNum-nowNum)>=3 && allNum>=6){
        var oA=document.createElement('a');
        oA.href='#'+allNum;
        oA.innerHTML='尾页';
        obj.appendChild(oA);
    }
    callback(nowNum,allNum);
    var aA=obj.getElementsByTagName('a');
    for(var i=0;i<aA.length;i++){
        aA[i].onclick=function(){
            var nowNum=parseInt(this.getAttribute('href').substring(1));
            obj.innerHTML='';
            page({
                id:opt.id,
                nowNum:nowNum,
                allNum:allNum,
                callback:callback
            })
        }

    }

}