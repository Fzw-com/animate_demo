$(function(){
	
	$('input').focus(function(){
		$(this).val('');
		});
		$('input').blur(function(){
			if($(this).val()==''){
				$(this).val('Search website');
				}
			});
			//验证表单焦点
	
	$('#sel1 a').click(function(event){
		event.stopPropagation();//阻止事件冒泡
		$('#sel1 ul').css('display','none');
		var oUl=$(this).siblings('ul');
		oUl.css('display','block');
		
		$('#sel1 li').click(function(){
			//alert(1);
			$(this).closest('ul').siblings('h2').html($(this).html());
			$(this).closest('ul').css('display','none');
			});
				
			$(document).click(function(){
				oUl.css('display','none');
				});
			});
		});
		//中间菜单效果
	
	$(function(){	
	var oImg=$('#ad li img');
	var iSpeed=-5;
	var timer=null;
	
	function getStyle(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
		}
	
	function autoPlay(){
	var iCur=0;
    var num=oImg.length-1;
		timer=setInterval(function  fnTab(){
			iCur=Math.round(getStyle(oImg[num],'opacity')*100);
			oImg[num].style.opacity=(iCur+iSpeed)/100;
			oImg[num].style.filter='alpha(opacity='+(iCur+iSpeed)+')';	
	
			if(iCur+iSpeed==10){	
				num--;
			    }
			if(num<0){	
			for(var i=0;i<oImg.length;i++){
			oImg[i].style.opacity=1;
			    }
			num=oImg.length;
			num--;
			}						
			},200);		
		}
		autoPlay();	
		
	});
	//渐变效果

$(function(){
	var num=0;
	var oUl=$('#scorll_wrap ul');
	oUl.append(oUl.html());
	var oLi=$('#scorll_wrap li');
	var timer=null;
	oUl.css('width',oLi.length*oLi.eq(0).outerWidth());
	
	$('.next').mouseout(function(){
		autoPlay();
		})
	$('.prve').mouseout(function(){
		autoPlay();
		})
	//鼠标离开继续自动播放
	
	
	$('.next').click(function(){
		clearInterval(timer);
		if(num==0){
			num=oLi.length/2;
			oUl.css('left',-oUl.outerWidth()/2);
			}
			doMove(oUl,oLi.eq(0).outerWidth()*-num,-(num-1)*oLi.eq(0).outerWidth());
			num--;
		});
		//点击向右轮播
	
	
	$('.prve').click(function(){
		clearInterval(timer);
		moveLeft();
		});
	//点击向左轮播
	
	
	function autoPlay(){
		clearInterval(timer);
		timer=setInterval(function(){
			moveLeft();
			},2000);
		}
		autoPlay();
	//自动播放
   
   
    function doMove(obj,old,now){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iSpeed=(now-old)/10;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
//			if(old==iSpeed){
//				clearInterval(timer);
//				}
				old+=iSpeed;
			obj.css('left',old);
			},30);
		}
		//封装左右运动函数
	
	
		function moveLeft(){
			if(num==oLi.length/2){
			num=0;
			oUl.css('left',0);
			}
		doMove(oUl,oLi.eq(0).outerWidth()*-num,-(num+1)*oLi.eq(0).outerWidth());
		num++;
			}
		//封装向左运动效果
});	
