function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name]; //IE
	} else {
		return getComputedStyle(obj, false)[name]; //IE9+,chrome,FF
	}
}

function startMove(obj, json, fnEnd) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;
		for (var attr in json) {
			var cur = 0; //属性当前值
			if (attr == 'opacity') {
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100); //Math.round()四舍五入，可用可不用
			} else {
				cur = parseInt(getStyle(obj, attr)); //getStyle()的值是100px
			}
			var speed = (json[attr] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (cur != json[attr])
				bStop = false;
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed) / 100;
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) fnEnd();
		}
	}, 30);
}