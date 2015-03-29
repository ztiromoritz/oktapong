jQuery(function(){
	//
	
	var KEY_W = 87;
	var KEY_S = 83;
	
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	
	
	// Game - Objects
	
	
	var canvas = document.getElementById("mainCanvas");
	var stage = new createjs.Stage(canvas);
	var ctx = canvas.getContext('2d');
		
	var field = new okta.Field();
	
	var sOpts = {color : "#33ffcc", name: 'south', leftKey: KEY_RIGHT, rightKey: KEY_LEFT}; //Yeah, know :)
	var sPaddle = new okta.Paddle(jQuery.extend(sOpts, SOUTH));
	jQuery('.south').css('color',"#33ffcc");
	
	var wOpts = {color : "#ff6600",  name: 'west', leftKey: KEY_S, rightKey: KEY_W};
	var wPaddle = new okta.Paddle(jQuery.extend(wOpts, WEST));
	jQuery('.west').css('color',"#ff6600");
	
	var nOpts = {color : "#99ee00",  name: 'north', leftKey: 501, rightKey: 502};
	var nPaddle = new okta.Paddle(jQuery.extend(nOpts, NORTH));
	jQuery('.north').css('color',"#99ee00");
	
	var eOpts = {color : "#f6f650", name: 'east', leftKey: 503, rightKey: 504};
	var ePaddle = new okta.Paddle(jQuery.extend(eOpts, EAST));
	jQuery('.east').css('color',"#f6f650");

	var ball = new okta.Ball({x:250, y:250, 
				obstacles: field.getObstacles(),
				paddles    : {north: nPaddle, east: ePaddle, south: sPaddle, west: wPaddle},
				deathzones : {north: 50, east: 450, south: 450,  west: 50}
	});
	// =========
	

	
	var showMenu = function() {
		jQuery('#main').hide();
		jQuery('#menu').show();
		okta.menu.bind();
		
		var ticker = createjs.Ticker;
		ticker.removeAllEventListeners();
	};
	
	var initGame = function(){

				
		
		stage.addChild(field);
			
		stage.addChild(nPaddle);
		stage.addChild(ePaddle);
		stage.addChild(sPaddle);
		stage.addChild(wPaddle);
		
		
		
		stage.addChild(ball);
		
				var ticker = createjs.Ticker;
	
		ticker.setFPS(30);
	
		//ticker.addEventListener("tick", stage);
		
		
		// , okta.pads.tick
	};
	
	
	
	var startGame = function(humanPlayer) {
		jQuery('#menu').hide();
		jQuery('#main').show();
			
		okta.game.reset();	
		okta.game.bind();
		okta.game.setBall( ball );
		okta.game.setMode( 0 );
		
		
		var controls = [
			{ki: true,  leftKey: 0, rightKey: 0},
			{ki: false, leftKey: KEY_RIGHT, rightKey: KEY_LEFT},
			{ki: false, leftKey: KEY_S, rightKey: KEY_W},			
			{ki: false, leftKey: 501, rightKey: 502},
			{ki: false, leftKey: 503, rightKey: 504},
			{ki: false, leftKey: 505, rightKey: 506},
			{ki: false, leftKey: 507, rightKey: 508}	
		];
		//swne
		var ctrl = controls[ jQuery('#p1').data('control') ];
		sPaddle.ki = ctrl.ki;
		sPaddle.leftKey = ctrl.leftKey;
		sPaddle.rightKey = ctrl.rightKey;
		
		var ctrl = controls[ jQuery('#p2').data('control') ];
		wPaddle.ki = ctrl.ki;
		wPaddle.leftKey = ctrl.leftKey;
		wPaddle.rightKey = ctrl.rightKey;
		
		var ctrl = controls[ jQuery('#p3').data('control') ];
		nPaddle.ki = ctrl.ki;
		nPaddle.leftKey = ctrl.leftKey;
		nPaddle.rightKey = ctrl.rightKey;
		
		var ctrl = controls[ jQuery('#p4').data('control') ];
		ePaddle.ki = ctrl.ki;
		ePaddle.leftKey = ctrl.leftKey;
		ePaddle.rightKey = ctrl.rightKey;
		
		
		var ticker = createjs.Ticker;
	
		var ticker = createjs.Ticker;
	
	
		
		
		ticker.addEventListener("tick", 
			okta.game.tick(stage,  
				[nPaddle,ePaddle, sPaddle,wPaddle, ball, okta.pads]));
		
		
		
		
	};
	
	initGame();
	
	
	okta.game.init({onESC: function(){showMenu();}});
	
	okta.menu.init([
		function(){  },
		function(){  },
		function(){  },
		function(){  },
		function(){ startGame(4);}
	]);
	
	okta.menu.bind();
	
	showMenu();
	
	
	window.addEventListener("gamepadconnected", function(e) {
  		jQuery('.padinfo').html(okta.pads.info());
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
  		jQuery('.padinfo').html(okta.pads.info());
	});

});
