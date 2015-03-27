jQuery(function(){
	jQuery('#main').show();
	
	
	
	var canvas = document.getElementById("mainCanvas");
	var stage = new createjs.Stage(canvas);
	
	var ctx = canvas.getContext('2d');
	

	
	var field = new okta.Field();
	stage.addChild(field);
	
	var nOpts = {color : "#5c8b00"};
	var nPaddle = new okta.Paddle(jQuery.extend(nOpts, okta.NORTH));
	
	var eOpts = {color : "#f6f650"};
	var ePaddle = new okta.Paddle(jQuery.extend(eOpts, okta.EAST));
	
	var sOpts = {color : "#33ffcc"};
	var sPaddle = new okta.Paddle(jQuery.extend(sOpts, okta.SOUTH));
	
	var wOpts = {color : "#ff6600"};
	var wPaddle = new okta.Paddle(jQuery.extend(wOpts, okta.WEST));
	
	stage.addChild(nPaddle);
	stage.addChild(ePaddle);
	stage.addChild(sPaddle);
	stage.addChild(wPaddle);
	
	var ball = new okta.Ball({x:250, y:250, obstacles: [
		new Segment( new Vect(50, 150) , new Vect(150,50)),
		new Segment( new Vect(350, 50) , new Vect(450, 150)),
		new Segment( new Vect(450, 350), new Vect(350, 450)),
		new Segment( new Vect(150, 450), new Vect(50, 350)),
		nPaddle, ePaddle, sPaddle, wPaddle
	]});
	
	stage.addChild(ball);

	
	
	
	
	okta.game.bind();
	var ticker = createjs.Ticker;

	ticker.setFPS(30);


	ticker.addEventListener("tick", stage);
	ticker.addEventListener("tick", 
		okta.game.tick(stage, 
			[nPaddle,ePaddle, sPaddle,wPaddle, ball ]));
	
	
	
});
