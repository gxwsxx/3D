if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
            "use strict";
            if (target === undefined || target === null)
                throw new TypeError("Cannot convert first argument to object");
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) continue;
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                }
            }
            return to;
        }
    });
}
Object.prototype.hasClass = function(classname) {
    var f = false;
    if(this.className){
    	var arr = this.className.split(" ");
    	arr.forEach(function(v, i){
    		if(v === classname){
    			f = true;
    		}
    	});
    }
    return f;
};
Object.prototype.addClass = function(classname) {
    var f = this.hasClass(classname);
    if (!f) {
        if (this.className) {
            this.className += " " + classname;
        } else {
            this.className = classname;
        }
    }
};
Object.prototype.removeClass = function(classname) {
    if (this.hasClass(classname)) {
        var reg = new RegExp("(\\s|^)" + classname + "(|$)");
        this.className = this.className.replace(reg, "");
    }
};

Object.prototype.powerSwitch = function(options){
	var defaults = {
		classAdd: "focus",
		classActive: "active",
		attribute1: "data-rel",
		attribute2: "data-dot",
		autoTime: 3000,          // 自动播放时间
		focusDelay: 200,
		indexSelected: 0
	};
	var params = Object.assign({}, defaults, options || {});
	var self = Array.prototype.slice.call(this);
	var lenRelatives = self.length;

	var funAutoPlay = function(index){
		if(index !== false && index != undefined){
			params.indexSelected = index;
		}
		if(params.indexSelected >= lenRelatives){
			params.indexSelected = 0;
		}else if(params.indexSelected < 0){
			params.indexSelected = 0;
		}
		self.forEach(function(v, i){
			var selector1 = v.getAttribute(params.attribute1);
			var	selector2 = v.getAttribute(params.attribute2);
			document.getElementById(selector1).style.display = "none";
			document.getElementById(selector2).removeClass(params.classAdd);
		});

		var i = params.indexSelected;
		console.log(i);
		var selector1 = self[i].getAttribute(params.attribute1);
		var	selector2 = self[i].getAttribute(params.attribute2);
		document.getElementById(selector1).style.display = "block";
		document.getElementById(selector2).addClass(params.classAdd);
	}
	var focusTimer;
	function autoPlay(){
		focusTimer = setInterval(function(){
			funAutoPlay();
			params.indexSelected++;
		}, params.autoTime);
	}

	self.forEach(function(element, index){
		element.onfocus = function(){
			clearInterval(focusTimer);
			funAutoPlay(index);
		};
		element.onblur = function(){
			params.indexSelected++;
			autoPlay();
		}
	});
	funAutoPlay();
	autoPlay();
	params.indexSelected++;
}