var $ = function(selector, context) {
    return new $.fn.init(selector, context);
}

$.fn = $.prototype;

$.fn = {
    init: function(selector, context) {
        var nodelist = (context || document).querySelectorAll(selector);
        this.length = nodelist.length;
        for (var i = 0; i < this.length; i++) {
            this[i] = nodelist[i];
        }
        return this;
    },
    each: function(fn) {
        var i = 0,
            length = this.length;
        for (; i < length; i++) {
            fn.call(this[i], i);
        }
        return this;
    },
    hide: function() {
        this.each(function() {
            this.style.display = "none";
        });
    }
}

// $.fn.init = function(selector, context) {
//     var nodelist = (context || document).querySelectorAll(selector);
//     this.length = nodelist.length;
//     for (var i = 0; i < this.length; i++) {
//         this[i] = nodelist[i];
//     }
//     return this;
// };

// $.fn.each = function(fn) {
//     var i = 0,
//         length = this.length;
//     for (; i < length; i++) {
//         fn.call(this[i], i);
//     }
//     return this;
// };
// $.fn.hide = function() {
//     this.each(function() {
//         this.style.display = "none";
//     });
// };

$.fn.init.prototype = $.fn;