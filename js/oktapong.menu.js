(function(okta){
	
	var menuSize = 5; //jQuery('#menu ul li').size();
	var index = 0;
	var _items;
	
	var getControls = function(){
		var controls = ['Computer', 'Keys: \u2190 \u2192', 'Keys: W,S' ];
		var gamepads = navigator.getGamepads ? navigator.getGamepads() 
			: (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []); 
		var l = gamepads.length;
		for(var i = 0; i<l;i++)
			controls.push('Gamepad '+(i+1));	
		return controls;	
	};
	
	var handleKeyDown = function(event) {
		var controls = getControls();
		var len = controls.length;
		var cur = $($('#menu ul li').get(index)).data('control');
		
	    switch(event.keyCode) {
	        case 38: //up
	            $($('#menu ul li').get(index)).removeClass('selected'); 
	            index = (index - 1) % menuSize;
	            $($('#menu ul li').get(index)).addClass('selected');
	            break;
	        case 40: //down
	            $($('#menu ul li').get(index)).removeClass('selected'); 
	            index = (index + 1) % menuSize;
	            $($('#menu ul li').get(index)).addClass('selected');
	            break;
	        case 37: //Left
	        	cur = ((cur - 1) + len) % len;
	        	$($('#menu ul li').get(index)).find('.control').text(controls[cur]);
	        	$($('#menu ul li').get(index)).data('control', cur);
	        	break;
	        case 39: // Right
	        	console.log("right");
	        	cur = (cur + 1) % len;
	        	$($('#menu ul li').get(index)).find('.control').text(controls[cur]);
	        	$($('#menu ul li').get(index)).data('control', cur);
	        	break;
	        case 32: //space
	        case 13: //enter 
	        	_items[index]();   
	            break;
	    }
  	};
	
	okta.menu = {};
	
	okta.menu.init = function( items ){
		_items = items;
		
		$('#menu ul li').data('control', 0);
	};
	
	okta.menu.bind = function(){
		window.onkeydown = handleKeyDown;
	};
	
	

	
	okta.menu.unbind = function(){
		
	};
})(okta);


jQuery(function(){
	//okta.menu.bind();	
});
