(function(okta){
	
	
	var state = {
	};
	var clearState = function(){
		state.keys = new MinimalSet(), 
		state.points = {};
		state.points.north = 0;
		state.points.east = 0;
		state.points.south =  0;
		state.points.west=  0;
	};
	clearState();
	
	
	var handleKeyDown = function(e){
		var evt = e || window.event;
		console.log('down' +e.keyCode );
		state.keys.add(e.keyCode);	
		console.log(state.keys.data);
	};
	
	var handleKeyUp = function(e){
		var evt = e || window.event;
		state.keys.remove(e.keyCode);	
	};
	
	okta.game = {};
	
	okta.game.bind = function(){
		window.onkeydown = handleKeyDown;
		window.onkeyup   = handleKeyUp;	
	};
	
	
	okta.game.tick = function(stage,tickables,drawables){
		tickables = tickables || [];
		drawables = drawables || [];
				
		return function(event){
		
			var l = tickables.length;
			while(l--){
				tickables[l].tick(event, state);
			};
			
			var n = drawables.lenght;
			while(n--){
				drawables[l].draw();
			}
			
			stage.update(event);	
		};
	};
	
	
	
	
	
	
	
	
})(okta);
