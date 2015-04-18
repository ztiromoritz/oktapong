(function(okta){
	
	
	var state = {
	};
	var clearState = function(){
		state.keys = new MinimalSet(),
		state.pointsChanged = true; 
		state.points = {};
		state.points.north = 0;
		state.points.east = 0;
		state.points.south = 0;
		state.points.west=  0;
		state.time = 60;
		
		state.out = {};
		state.out.north = 0;
		state.out.east = 0;
		state.out.south = 0;
		state.out.west = 0;
	};
	clearState();
	
	var updateScore = function(){
		jQuery('.points.north').text(state.points.north);
		jQuery('.points.south').text(state.points.south);
		jQuery('.points.east').text(state.points.east);
		jQuery('.points.west').text(state.points.west);
	};
	
	
	var handleKeyDown = function(e){
		var evt = e || window.event;
		if(e.keyCode === 27) //ESC
			onESC();
		state.keys.add(e.keyCode);	
	};
	
	var handleKeyUp = function(e){
		var evt = e || window.event;
		state.keys.remove(e.keyCode);	
	};
	
	var _mode = 0;
	var onESC;
	
	okta.game = {};
	
	okta.game.reset = function(){
		clearState();
		
	};

	okta.game.init = function(options){
		onESC = options.onESC || function(){};
	};
		
	okta.game.bind = function(){
		window.onkeydown = handleKeyDown;
		window.onkeyup   = handleKeyUp;	
	};
	
	
	okta.game.setBall = function(ball){
		state.ball = ball;
	};
	
	okta.game.setMode = function( mode ){
		_mode = mode;
	};
	
	okta.game.tick = function(stage,tickables){
		tickables = tickables || [];
		
				
		return function(event){
		
			var l = tickables.length;
			while(l--){
				tickables[l].tick(event, state);
			};
			
			stage.update(event);
			
			if(state.pointsChanged)
				updateScore();	
			state.pointsChanged = false;
		};
	};	
	
})(okta);
