function navbarClock() {
    // 数字时钟
    function toDou(n) {
        return n < 10 ? '0' + n : '' + n;
    }
    var oClock = document.getElementsByClassName('navbar')[0];
    var aI = oClock.getElementsByTagName('i');

    function clock() {
        var oDate = new Date();
        var str = toDou(oDate.getHours()) + toDou(oDate.getMinutes()) + toDou(oDate.getSeconds());
        for (var i = 0; i < aI.length; i++) {
            aI[i].className = 'iconfont';
            aI[i].className += ' ' + 'icon-shuzi' + str.charAt(i);
            // aI[i].classList.add('icon-shuzi'+str.charAt(i));
        }
    }
    clock();
    setInterval(clock, 1000);
}

function carousel() {
    // 轮播图
    var oCarousel = document.getElementsByClassName('wrap')[0];
    var oPic = oCarousel.getElementsByClassName('picture')[0];
    var oDiv = oCarousel.getElementsByClassName('buttons')[0];
    var aBtn = oDiv.getElementsByTagName('span');
    var oLeft = oCarousel.getElementsByClassName('left')[0];
    var oRight = oCarousel.getElementsByClassName('right')[0];
    var aIcon = oCarousel.getElementsByClassName('iconfont');
    var timerCrousel = null;

    // 获取视口宽度
    var cWidth = window.innerWidth;
    // 包裹图片进行滚动的div宽度设置
    oPic.style.width = cWidth * aBtn.length + 'px';

    var now = 0;

    function tab() {
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].className = '';
        }
        aBtn[now].className = 'on';
        startMove(oPic, {
            left: -cWidth * now
        });
    }

    function noSlide(num) {
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].className = '';
        }
        aBtn[now].className = 'on';
        oPic.style.left = -cWidth * num + 'px';
    }

    function prev() {
        now--;
        if (now == -1) {
            now = aBtn.length - 1;
            noSlide(aBtn.length - 1);
        } else {
            tab();
        }
    }

    function next() {
        now++;
        if (now == aBtn.length) {
            now = 0;
            noSlide(0);
        }
        tab();
    }

    oLeft.onclick = prev;
    oRight.onclick = next;

    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].index = i;
        aBtn[i].onclick = function() {
            now = this.index;
            tab();
        }
    }

    // 自动播放
    timerCrousel = setInterval(next, 3000);
    oCarousel.onmouseover = function() {
        clearInterval(timerCrousel);
        startMove(aIcon[0], {
            opacity: 60
        });
        startMove(aIcon[1], {
            opacity: 60
        });
    }
    oCarousel.onmouseout = function() {
        timerCrousel = setInterval(next, 3000);
        startMove(aIcon[0], {
            opacity: 0
        });
        startMove(aIcon[1], {
            opacity: 0
        });
    }
}

window.onload = function() {
    navbarClock();
    carousel();
}