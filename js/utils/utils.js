(function(global){
	
	
	var Utils = {};
	
	Utils.between = function (a,x,y){
		return Math.min(x,y) <= a && a <= Math.max(x,y);
	};
	
	
	

	
	Utils.within = function(a,x,y){
		return Math.min(x,y) < a && a < Math.max(x,y);
	};
	
	global.Utils = Utils;
	
})(this);
