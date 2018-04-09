/**
 * Created by Administrator on 2016/4/22.
 */
$(function(){
    mv.app.news();
    mv.ui.exchange($('.pic_img'));
    mv.ui.section($('.section_list li'));
    mv.ui.skip($('#tab1_coupons div'),$('#main .lifestyle_list'));
    mv.ui.skip($('#tab div'),$('#section .lifestyle_list'));
    mv.ui.focus($('#bar_inp'));
    mv.ui.focus($('#key'));
    mv.ui.autoPlay($('.list_pic li'),$('.pic1 img'));
    mv.ui.togglePic($('.list_show'));
    mv.ui.switch($('#menu li'),$('#bar_inp'));
    mv.ui.showList($('.comment1'),$('.option_list'));
    mv.ui.showList($('.comment2'),$('.com_pic'));
});
var mv={};

mv.ui={};

//实现nav导航切换效果
mv.ui.switch=function(obj,oinp){
    var arrText=['例如：荷棠鱼坊烤鱼 或 樱花日本料理',
        '例如：宽窄巷子54号',
        '例如：满500元送100元代金券',
        '例如：美食美文欣赏',
        '例如：美食视频欣赏'];
    var iNow=0;
    oinp.attr('value',arrText[iNow]);//初始化input值
    obj.click(function(){
        obj.attr('class','');
        $(this).attr('class','active');
        iNow=$(this).index();
        oinp.attr('value',arrText[iNow]);
        mv.ui.focus(oinp);
    });

};

mv.ui.changeText=function(){
    var timer=null;
    var $btnup=$('.inf_btn .up');
    var $btndown= $('.inf_btn .down');
    var $ul=$('#inf_fram');
    var str='';
    var iH=0;
    var iNow=0;
    var jason={
        'name':['萱萱','丽丽','红红','张张','小小'],
        'time':['5分钟前','15分钟前','8分钟前','10分钟前','12分钟前'],
        'event':['写了一篇新文章：那些灿烂华美的瞬间',
            '写了一篇新文章：死定了圣诞节了敬爱是劳',
            '写了一篇新文章：所得税的啦十大说得对',
            '写了一篇新文章：打得少打了是的撒来得及',
            '写了一篇新文章：代理商的垃圾的垃圾的']
    };
    for(var i=0;i<jason.name.length;i++){
        str+='<li><span class="inf_name">'+jason.name[i]+'</span> <span class="inf_time">'+jason.time[i]+'</span> <span class="inf_text">'+jason.event[i]+'</span></li>';
    }
    $ul.html(str);
    iH=$ul.height();
//鼠标点击事件
    $btnup.click(function(){
        doMove(-1);
    });
    $btndown.click(function(){
        doMove(1);
    });
//自动播放
    function autoPlay(){
        timer=setInterval(function(){
            doMove(-1);
        },3500);
    }
    autoPlay();
//鼠标移入移出
    $('#hide_list').hover(function(){
        clearInterval(timer);
    },autoPlay);
    function doMove(num){
        iNow+=num;
        if(Math.abs(iNow)>jason.name.length-1){
            iNow=0;
        }
        if(iNow>0){
            iNow = -(jason.name.length-1);
        }
        $ul.stop().animate({'top':iH*iNow},2200,'elasticOut');
    }
};
//鼠标移入移出新店铺效果
    mv.ui.showList=function(obj,content){
    obj.mouseover(function(){
        $(this).css('cursor','pointer');

        obj.removeClass('tab1').addClass('tab2 gradient');
        $(this).removeClass('tab2 gradient').addClass('tab1');

        $(content).css('display','none');
        $(content).eq($(this).index()).css('display','block');

    });
};

//日历中鼠标移入图片显示
mv.ui.exchange=function(obj){
    var $pic_tips=$('.pic_tips');
    var $img=$pic_tips.find('img');
    var $pic_tips1=$pic_tips.find('.pic_tips1');
    var $p=$pic_tips.find('p');
    var num=$('.calendar h3 p');

   obj.hover(function(){
       var index=$(this).parent().index();
       var iTop=$(this).parent().position().top-30;
       var iLeft=$(this).parent().position().left+50;
       $pic_tips.show();
       $pic_tips.css({'left':iLeft,'top':iTop});
       $p.html($(this).attr('info'));
       $img.attr('src',$(this).attr('src'));
       $pic_tips1.html(num.eq(index%num.size()).html());

   },function(){
       $pic_tips.hide();
   });
};

//BBS论坛显示隐藏效果
mv.ui.section=function(obj){
    var $list_text=$('.section_list_text');
    var $list_pic=$('.section_list_pic');

    obj.mouseover(function(){
            $(this).css('cursor','pointer');
            $list_text.css('display','block');
            $list_pic.css('display','none');
            $(this).find($list_text).css('display','none');
            $(this).find($list_pic).css('display','block');
    });

    obj.mouseout(function(){
            $(this).find($list_text).css('display','none');
            $(this).find($list_pic).css('display','block');
    });
};

//知道分子鼠标移入移出效果
mv.ui.skip=function(obj,nextPage){
    obj.mouseover(function(){
        //alert(index);
       $(this).css('cursor','pointer');
       $(this).addClass('tab1');
       $(this).siblings().removeClass('tab1');

       if($(this).index()!=0){
           obj.eq(0).addClass('gradient');
       }

       $(this).removeClass('tab2');
       $(nextPage).css('display','none');
       $(nextPage).eq($(this).index()).css('display','block');
    });

    obj.mouseout(function(){
        $(this).siblings().addClass('tab2');
    })
};

//鼠标focus事件
mv.ui.focus=function(obj){
    var inpValue=obj.attr('value');
    obj.focus(function(){
           obj.attr('value','');
    });
    obj.blur(function(){
        obj.attr('value',inpValue);
    })
};

//图片自动播放效果
mv.ui.autoPlay=function(objLi,objPic) {
    var num = 1;
    var $p = $('.pic_text');
    var timer = null;
    var $pic = $('.pic1');
    var arrText = ['美丽大方的女子', '热像摄影中的光影', '爸爸去哪儿'];
    $p.html(arrText[0]);

    function autoPic() {
        timer = setInterval(function () {

            if (num == objLi.length) {
                num = 1;
            } else {
                num++;
            }

            objLi.each(function () {
                objLi.attr('class', '');
                objLi.eq(num - 1).attr('class', 'active');
                objPic.attr('src', "img/Viwepager_pic" + num + ".png");
                $p.html(arrText[num - 1]);
            });
        }, 2000);
    }

    autoPic();

    $pic.hover(function () {
        clearInterval(timer);
    }, function () {
        autoPic();
    });
};

//图片文字隐藏显示效果
mv.ui.togglePic=function(obj){

    obj.mouseover(function(){
        obj.children('div').css('display','none');
        $(this).children('div').css('display','block');
    });
};

mv.app={};
 mv.app.news=function(){
  var $information_name=$('#information_name');
  var $information_text=$('#information_text');

      mv.ui.changeText($information_name,$information_text);

 };
