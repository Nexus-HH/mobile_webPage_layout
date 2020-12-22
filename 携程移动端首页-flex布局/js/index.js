window.addEventListener("load",function(){
    // 取消click 300ms 延时
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }

    var focus = document.querySelector(".focus");
    var ul = focus.children[0];
    var ol = focus.children[1];
    var focusWidth = focus.offsetWidth;

    //手指触摸图片
    // 获取手指的初始位置坐标
    var startX = 0;
    // 获得手指移动距离
    var moveX = 0;
    var flag = false;
    ul.addEventListener("touchstart",function(e){
        clearInterval(timer);
        timer = null;
        startX = e.targetTouches[0].pageX;
    });
    ul.addEventListener("touchmove",function(e){
        // clearInterval(timer);
        // timer = null;
        //计算手指移动距离
        moveX = e.targetTouches[0].pageX - startX;
        //盒子移动距离 = 盒子原来距离 + 手指移动距离
        var translateX = -index * focusWidth + moveX;
        ul.style.transition = "none";
        ul.style.transform = "translate(" + translateX + "px)";
        flag = true;
        e.preventDefault();
    });
    ul.addEventListener("touchend",function(){
        // 移动距离大于50px就移动到下一张或上一张
        if(flag){
            if(moveX > 50){
                index--;
            }
            else if(moveX < -50){
                index++;
            }
            var translateX = -index * focusWidth;
            ul.style.transition = "all .3s";
            ul.style.transform = "translate(" + translateX + "px)";
        }
        flag = false;
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            var translateX = -index * focusWidth;
            ul.style.transition = "all .3s";
            ul.style.transform = "translate(" + translateX + "px)";
        },2000);
    });

    var index = 0;
    var timer = setInterval(function(){
        index++;
        var translateX = -index * focusWidth;
        ul.style.transition = "all .3s";
        ul.style.transform = "translate(" + translateX + "px)";
    },2000);
    //应该要等图片过渡完了再判断是否到了最后一张图片（无缝滚动 小圆圈添加类）
    ul.addEventListener("transitionend",function(){
        if(index == ul.children.length-2){
            index = 0;
        }
        else if(index < 0){
            index = ul.children.length-3;
        }
        var translateX = -index * focusWidth;
        // 要关闭过渡效果
        ul.style.transition = "none";
        ul.style.transform = "translate(" + translateX + "px)";
        ol.querySelector(".current").classList.remove("current");
        ol.children[index].classList.add("current");
    });

    // 返回顶部操作
    var goBack = document.querySelector(".goBack");
    var nav = document.querySelector("nav");
    window.addEventListener("scroll",function(){
        if(window.pageYOffset >= nav.offsetTop){
            goBack.style.display = "block";
        }
        else{
            goBack.style.display = "none";
        }
    });
    goBack.addEventListener("click",function(){
        window.scroll(0,0);
    });
})