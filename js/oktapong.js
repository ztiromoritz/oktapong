jQuery(function(){
	jQuery('#main').show();
	
	
	
	var canvas = document.getElementById("mainCanvas");
	var stage = new createjs.Stage(canvas);
	
	var ctx = canvas.getContext('2d');
	

	
	var field = new okta.Field();
	stage.addChild(field);
	
	
	var nPaddle = new okta.Paddle();
	//nPaddle.draw();
	stage.addChild(nPaddle);
	
	
	okta.game.bind();
	var ticker = createjs.Ticker;
	ticker.addEventListener("tick", stage);
	ticker.addEventListener("tick", 
		okta.game.tick(stage, 
			[nPaddle], 
			[nPaddle]));
	
	
	
	
	
	
});
