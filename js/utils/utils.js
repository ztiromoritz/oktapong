(function(global){
	
	
	var Utils = {};
	
	
	

	
	
	
	Utils.between = function (a,x,y){
		return Math.min(x,y) <= a && a <= Math.max(x,y);
	};
	
	
	Utils.within = function(a,x,y){
		return Math.min(x,y) < a && a < Math.max(x,y);
	};
	
	global.Utils = Utils;
	
	
	if (!global.Date.now) {
		console.log('IE8 HACK!');
	  	Date.now = function now() {
	    	return new Date().getTime();
	  	};
	}
	
	
	
	
})(this);
