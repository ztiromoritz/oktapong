(function(okta){
	
	var velocity = 4.5;
			
	var Ball = function(options){
		options = options || {};

		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);	
		this.x = options.x;
		this.y = options.y;
		this.color = options.color || '#ffff7b';
		this.obstacles = options.obstacles || [];	
		this.direction = new Vect(1,0).rotate(Math.PI * 2 * Math.random());
		
		this.initBody();
	};
	
	var b = createjs.extend(Ball, createjs.Container);
	
	b.updatePosition = function(){
		var _x = this.x + this.direction.x * velocity;
		var _y = this.y + this.direction.y * velocity;	
		var move = this.direction.clone().mul(velocity);	
		var before = new Vect(this.x, this.y);
		var after  = before.clone().add(move);
		var segment = new Segment( before , after );
		var l = this.obstacles.length;
		while(l--){
			var obstacle = this.obstacles[l];	
			if(obstacle instanceof okta.Paddle){
				obstacle = obstacle.getSegment();
			};	
			if(obstacle.intersect( segment ) && move.isLeftOf(obstacle.connection)){
				console.log("collide");
				console.log(move + " /" +obstacle.connection);				
				move.reflectOn(obstacle.connection);
				this.direction = move.clone().normalize();       
				break;
			}
		}
		this.x = this.x + move.x;
		this.y = this.y + move.y;
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
