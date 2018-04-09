/**
 * Created by Administrator on 2018/1/30 0030.
 */
function setCss3(obj,attrObj){
    for(var i in attrObj){
        var newi = i;
        if(newi.indexOf("-")>0){
            var num = newi.indexOf("-");
            newi = newi.replace(newi.substr(num,2),newi.substr(num+1).toUpperCase());
        }
        obj.style[newi] = attrObj[i];
        newi = newi.replace(newi.charAt(0),newi.charAt(0).toUpperCase());
        obj.style["webkit"+newi]=attrObj[i];
        obj.style["moz"+newi]=attrObj[i];
        obj.style["o"+newi]=attrObj[i];
        obj.style["ms"+newi]=attrObj[i];
    }
}