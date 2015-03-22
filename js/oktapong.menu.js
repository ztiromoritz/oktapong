(function(okta){
	
	var menuSize = 5; //jQuery('#menu ul li').size();
	var index = 0;
	
	var handleKeyDown = function(event) {
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
	    }
  	};
	
	okta.menu = {};
	
	okta.menu.bind = function(){
		window.onkeydown = handleKeyDown;
	};
	
	okta.menu.unbind = function(){
		
	};
})(okta);


jQuery(function(){
	okta.menu.bind();	
});
