// JavaScript Document
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	}
function doMove(obj,attr,dir,target,endFn){
    dir=parseInt(getStyle(obj,attr))<target ? dir : -dir;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
	var speed=parseInt(getStyle(obj,attr))+dir;
	if(dir>0 && speed>target || dir<0 && speed<target){
	   speed=target;
	}
	obj.style[attr]=speed+"px";
	if(speed==target){
	   clearInterval(obj.timer);
	   endFn && endFn();
	}
	},30);
}