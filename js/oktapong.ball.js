(function(okta){
	
	var START_VELOCITY = 6.5;
	
	var velocity = START_VELOCITY;
			
	var Ball = function(options){
		options = options || {};

		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);	
		this.x = options.x;
		this.y = options.y;
		this.color = options.color || '#ffffff';
		this.obstacles = options.obstacles || [];	
		this.direction = new Vect(0,-1).rotate(Math.PI * 2 * Math.random());
		this.paddles = options.paddles || {};
		this.deathzones = options.deathzones || {};
		this.options = options;
		this.player = null;
		
		this.position = new Vect(this.x, this.y);
		
		this.initBody();
	};
	
	var b = createjs.extend(Ball, createjs.Container);
	
	b.tick = function(event, state){
		var move = this.direction.clone().mul(velocity);	
		var before = new Vect(this.x, this.y);
		var after  = before.clone().add(move);
		var segment = new Segment( before , after );
		
		//Hit Wall
		var l = this.obstacles.length;
		while( l-- ){
			var obstacle = this.obstacles[l];		
			if(obstacle.intersect( segment ) && move.isLeftOf(obstacle.connection)){
						
				move.reflectOn(obstacle.connection);
				this.direction = move.clone().normalize();       
				break;
			}
		}
		
		//Hit by paddle
		var pEast = this.paddles.east;
		var pSouth = this.paddles.south;
		var pWest = this.paddles.west;
		var pNorth = this.paddles.north;
		var phi = 0;
		if(after.x > this.deathzones.east){
			var from = pEast.getFrom().y;
			var to = pEast.getTo().y;
			if( Utils.between(after.y, from,  to) ){
				phi = Math.PI * (0.5 + (1-this.positionBetween(after.y, from, to))); //90°-270°
				this.paddeled(pEast,move,phi);		
			}	
		}else if(after.y > this.deathzones.south){
			var from = pSouth.getFrom().x;
			var to = pSouth.getTo().x;
			if( Utils.between(after.x, from, to)){
				phi = Math.PI * (1 + this.positionBetween(after.x,from,to)) ;  //180°-360°
				this.paddeled(pSouth,move,phi);
			}
		}else if(after.x < this.deathzones.west){
			var from = pWest.getFrom().y;
			var to = pWest.getTo().y;
			if( Utils.between(after.y, from,  to) ){
				phi = Math.PI * (-0.5 + this.positionBetween(after.y,from,to)) ;  //270°-90°
				
				this.paddeled(pWest,move,phi);
			}	
		}else if(after.y < this.deathzones.north){
			var from = pNorth.getFrom().x;
			var to = pNorth.getTo().x;	 
			if( Utils.between(after.x, from, to)){
				phi = Math.PI * (1-this.positionBetween(after.x,from,to)) ;  //0°-180°
				this.paddeled(pNorth, move,phi);
			}	
		}
		
		// Deathzone
		var DEATH = 10;
		if(after.x > this.deathzones.east + DEATH ){
			this.out('east',state);
			return;
		} else if (after.y > this.deathzones.south + DEATH ){
			this.out('south',state);
			return;
		} else if ( after.x < this.deathzones.west - DEATH ){
			this.out('west',state);
			return;
		} else if(after.y < this.deathzones.north - DEATH){
			this.out('north',state);
			return;
		}

		this.x = this.x + move.x;
		this.y = this.y + move.y;
		
	};
	
	b.positionBetween = function(a,x,y){
		var ADD = 10; //hack to narrow the reflection angle
		var from = Math.min(x,y);
		var to = Math.max(x,y);
		from = from - ADD;
		to = to + ADD;
		var length = to - from;
		
		return (a - from) / length;
	};
	
	
	b.out = function( defeated , state ){
		
		okta.sound.out();
		
		this.x = this.options.x;
		this.y = this.options.y;
		this.velicity = START_VELOCITY;
		
		
		if(this.player === null){
			state.points[defeated] -= 1;	
		}else if(this.player === defeated){
			state.points[defeated] -= 1;
		}else{
			state.points[this.player] += 1;
		}
		state.pointsChanged = true;
		
		//reset;
		this.player = null;
		this.color = '#fff';
		this.redraw();
		this.direction = new Vect(1,0).rotate(Math.PI * 2 * Math.random());
		
	};
	
	b.paddeled = function(paddle,move,phi){
		//Color and player
		this.color = paddle.color;
		this.redraw();
		this.player = paddle.name;
		
		
		//Sound
		okta.sound.pling();
		
		//Direction	
		move.rotateTo(phi);
		this.direction.rotateTo(phi);
		this.velicity += 0.5;
	};
		
	b.initBody = function(){
		this.body.graphics
		 	.beginFill(this.color)
		 	.drawCircle(0,0,3);		
	};
	
	b.redraw = function(color){
		this.body.graphics.clear();
		this.initBody();
	};

	
	b.getPosition = function(){
		this.position.x = this.x;
		this.position.y = this.y;
		return this.position;
	};
	

		
	okta.Ball = createjs.promote(Ball, "Container");
		
})(okta);
