(function(){
	"use strict";

	var root = this;

	var pagination = function(options){
		var defaults = {
			template_id: "", //模版id
			container_id: "", //容器id
			prev: "prev",  //上一页
			next: "next",  //下一页
			curr: 1, //客户端当前页
			size: 4, //每页显示个数
			total: 1, //总记录数
			items: [] //数据
		};
		var param = defaults;
		for(var key in options){
			param[key] = options[key];
		}
		if(!param.template_id || !param.container_id || param.items.length === 0){
			return;
		}
		var loadData = function(){
			var start = 0;
			var prev = document.getElementById(param.prev) || document.getElementsByClassName(param.prev)[0];
			var next = document.getElementById(param.next) || document.getElementsByClassName(param.next)[0];
			var pages = Math.ceil(param.total / param.size);
			if(param.curr === 1){
				start = 0;
			}else{
				start = (param.curr - 1) * param.size;
			}
			var data = {
			    "list": param.items.slice(start, start + param.size)
			}
			var html = template(param.template_id, data);
			document.getElementById(param.container_id).innerHTML = html;

			if(pages === 1) {
				console.log(prev);
				prev.style.display = "none";
				next.style.display = "none";
				return;
			}
			if(param.curr === 1){
				prev.style.display = "none";
			}else if(param.curr === pages){
				next.style.display = "none";
			}else {
				prev.style.display = "block";
				next.style.display = "block";
			}

			var nodelist = document.querySelectorAll('#'+param.container_id+' a');
				nodelist = Array.prototype.slice.call(nodelist);
			nodelist.forEach(function(element, index){
				if(index % param.size === param.size-1){
					element.onkeydown = function(e){
						e = e || window.event;
						if(e.keyCode === 39){
							if(param.curr < pages){
								param.curr++
								loadData();
							}
						}
					}
				}
				if(index % param.size === 0){
					element.onkeydown = function(e){
						e = e || window.event;
						if(e.keyCode === 37){
							if(param.curr > 1){
								param.curr--;
								loadData();
							}
						}
					}
				}
			});
		}
		return loadData();
	}

	root.pagination = pagination;
}.call(this))