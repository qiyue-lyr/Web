function barrage() {
	var oBarrage = document.getElementsByClassName('barrage')[0];
	var oBox = oBarrage.getElementsByClassName('box')[0]; //box框
	var oTxt = oBarrage.getElementsByClassName('txt')[0]; //输入框
	var oBtn = oBarrage.getElementsByClassName('send-btn')[0]; //发送按钮

	var cW = oBox.offsetWidth;
	var cH = oBox.offsetHeight;

	// 点击发送
	oBtn.onclick = send;
	// 按enter键发送
	oTxt.onkeydown = function(e) {
		var oEvent = e || event;
		if (oEvent.keyCode === 13) {
			send();
		}
	};

	function send() {
		// 当oTxt的内容为空 || 任何空白字符
		if (oTxt.value.length <= 0 || (/^\s+$/).test(oTxt.value)) {
			alert('请输入弹幕');
			return false;
		}
		var message = oTxt.value;
		// 动态生成标签
		createEle(message);
		// 发送后清空输入框
		oTxt.value = '';
	}

	function createEle(txt) {
		//动态生成span标签
		var oMessage = document.createElement('span');
		oMessage.innerHTML = txt;
		// 生成标签的位置 x
		oMessage.style.left = cW + 'px';
		oBox.appendChild(oMessage); //把标签添加到oBox里面

		scroll.call(oMessage, {
			// parseInt("ffffff", 16) == 16777215 == 2^24-1
			// 但是颜色可能会出现黑色类，暂时不知道如何解决
			color: '#' + (~~(Math.random() * (1 << 24))).toString(16),
			top: ~~(Math.random() * cH / 2)
		});
	}

	function scroll(json) {
		//获取当前元素 left的值
		this._left = parseInt(this.offsetLeft);
		this.style.color = json.color;
		this.style.top = json.top + 'px';

		function move() {
			if (this._left <= -this.offsetWidth) {
				clearInterval(this.timer);
				this.parentNode.removeChild(this);
				return;
			}
			this._left += -2;
			this.style.left = this._left + 'px';
		}
		this.timer = setInterval(move.bind(this), 1000 / 60);

		this.onmouseover = function() {
			clearInterval(this.timer);
		}
		this.onmouseout = function() {
			this.timer = setInterval(move.bind(this), 1000 / 60);
		}
	}
}
window.onload = function() {
	barrage();
}