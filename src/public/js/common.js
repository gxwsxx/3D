if(document.getElementById('focus')){
	document.getElementById('focus').focus();
}

function show(el){
	document.querySelector(el).style.display = "block";
}
function hide(el){
	document.querySelector(el).style.display = "none";
}
function addFocus(el){
	var element = document.querySelector(el);
	var classname = element.className;
	element.className = classname + ' focus';
}
function removeFocus(el){
	var element = document.querySelector(el);
	var ele = element.className.split(" ");
	var classname = [];
	ele.forEach(function(v){
		if(v !== "focus"){
			classname.push(v);
		}
	});
	element.className = classname.join(" ");
}

template.helper('defaultImg', function(img, defimg){
	var defimg = defimg;
	if(!defimg) {
		defimg = '../public/images/car-default.jpg';
	}
	if(!img){
		img = defimg;
	}
	return img;
});