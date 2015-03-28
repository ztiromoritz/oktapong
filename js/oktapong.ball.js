(function(okta){
	
	var START_VELOCITY = 4.5;
	
	var velocity = START_VELOCITY;
			
	var Ball = function(options){
		options = options || {};

		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);	
		this.x = options.x;
		this.y = options.y;
		this.color = options.color || '#ffff7b';
		this.obstacles = options.obstacles || [];	
		this.direction = new Vect(0,-1).rotate(Math.PI * 2 * Math.random());
		this.paddles = options.paddles || {};
		this.deathzones = options.deathzones || {};
		this.options = options;
		
		this.initBody();
	};
	
	var b = createjs.extend(Ball, createjs.Container);
	
	b.updatePosition = function(){
		var move = this.direction.clone().mul(velocity);	
		var before = new Vect(this.x, this.y);
		var after  = before.clone().add(move);
		var segment = new Segment( before , after );
		
		//Hit Wall
		var l = this.obstacles.length;
		while( l-- ){
			var obstacle = this.obstacles[l];		
			if(obstacle.intersect( segment ) && move.isLeftOf(obstacle.connection)){
				console.log("collide");			
				move.reflectOn(obstacle.connection);
				this.direction = move.clone().normalize();       
				break;
			}
		}
		
		//Cross death zone
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
				
				this.paddeled(move,phi);		
			}else{
				this.reset();
				return;
			}	
		}else if(after.y > this.deathzones.south){
			var from = pSouth.getFrom().x;
			var to = pSouth.getTo().x;
			if( Utils.between(after.x, from, to)){
				phi = Math.PI * (1 + this.positionBetween(after.x,from,to)) ;  //180°-360°
				this.paddeled(move,phi);
			}else{
				this.reset();
				return;
			}
		}else if(after.x < this.deathzones.west){
			var from = pWest.getFrom().y;
			var to = pWest.getTo().y;
			if( Utils.between(after.y, from,  to) ){
				phi = Math.PI * (-0.5 + this.positionBetween(after.y,from,to)) ;  //270°-90°
				
				this.paddeled(move,phi);
			}else{
				this.reset();
				return;
			}	
		}else if(after.y < this.deathzones.north){
			var from = pNorth.getFrom().x;
			var to = pNorth.getTo().x;
		
			
			//250 ,227.5,272.5, -Infinity, 
			if( Utils.between(after.x, from, to)){
				phi = Math.PI * (1-this.positionBetween(after.x,from,to)) ;  //0°-180°
				console.log(after.x +" ,"+ from+","+to+", "+this.positionBetween(after.x,from,to) + ", "+phi);
				this.paddeled(move,phi);
			}else{
				this.reset();
				return;
			}

			
		}

		this.x = this.x + move.x;
		this.y = this.y + move.y;
		
	};
	
	b.positionBetween = function(a,x,y){
		var ADD = 0.0; //hack to narrow the reflection angle
		var from = Math.min(x,y);
		var to = Math.max(x,y);
		from = from - ADD;
		to = to + ADD;
		var length = to - from;
		console.log(length);
		return (a - from) / length;
	};
	
	
	b.reset = function(){
		this.direction = new Vect(1,0).rotate(Math.PI * 2 * Math.random());
		this.x = this.options.x;
		this.y = this.options.y;
		this.velicity = START_VELOCITY;
	};
	
	b.paddeled = function(move,phi){
		move.rotateTo(phi);
		this.direction.rotateTo(phi);
		this.velicity += 0.5;
	};
		
	b.initBody = function(){
		this.body.graphics
		 	.beginFill(this.color)
		 	.drawCircle(0,0,3);		
	};
	
	b.tick = function(even, state){
		this.updatePosition();
	};
		
	okta.Ball = createjs.promote(Ball, "Container");
		
})(okta);
