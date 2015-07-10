var App = (function ($) {
	"use strict";
	var theHash;
	var self = {
		init: function(){
			console.log('Hello World!');	
		}
	};
	return self;
})(jQuery);
jQuery(document).ready(function($){
	App.init();
});