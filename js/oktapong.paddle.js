(function(okta){
	
	var velocity = 0.05;
	var kiVelocity = 0.031;//0.025;//
	
	var NOOP = 0;
	var UP = 1;
	var DOWN = 2;

	
	var Paddle = function(options){
		options = options || {};
		
		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);
		
		this.length   = options.length 	 || 45;
		this.start    = options.start 	 || NORTH.start;
		this.stop     = options.stop 	 || SOUTH.stop;
		this.position = 0.5; 
		this.leftKey  = options.leftKey  || 37;
		this.rightKey = options.rightKey || 39;
		this.color    = options.color    || "#5c8b00";
		this.ki		  = options.ki;
		this.name 	  = options.name;
		
		
		this.v  	   = this.stop.clone().sub(this.start);
		this.v_n 	   = this.v.clone().normalize();
		this.v_p       = this.v_n.clone().mul(this.length);
		this.last_left = false;
		this.last_right = false;
		this.last_ki_move = NOOP;
		
		this.goalLine  = new Segment(this.stop, this.start);
		this.from      = new Vect(this.x, this.y);
		this.to 	   = new Vect(this.x, this.y).add(this.v_p);
		this.middle    = new Vect(this.x, this.y).add(this.v_p.clone().mul(0.5));
		
					
		this.initBody();
	};
	
	var p = createjs.extend(Paddle, createjs.Container);
	
	p.updatePosition = function(){	
		var range = this.v.length() - this.length;
		var w = this.v_n.clone().mul( range * this.position );
		var p1 = this.start.clone().add( w );
		
		this.x = p1.x;
		this.y = p1.y;
	};
	
	p.initBody = function(){
		this.body.graphics
		 	.beginStroke(this.color)
		 	.setStrokeStyle(4)
		    .moveTo(0,0)
		    .lineTo(this.v_p.x, this.v_p.y);	
		this.updatePosition();
	};
	
	
	p.tick = function(event, state){
		if(this.ki)
			this.tickKI(event, state);
		else
			this.tickHuman(event, state);
			
		this.updatePosition();
	};
	
	p.tickHuman = function(event, state){
		var l = this.last_left;
		var r = this.last_right;
		if(state.keys.contains(this.leftKey)){
			this.position = Math.max(0, this.position - velocity);
			this.last_left = true;
		}else if(l){
			this.position = Math.max(0, this.position - velocity * 0.5);
			this.last_left = false;
		}else{
			this.last_left = false;
		}
		if(state.keys.contains(this.rightKey)){
			this.position = Math.min(1,this.position + velocity);
			this.last_right = true;
		}else if(r){
			this.position = Math.min(1,this.position + velocity * 0.5);
			this.last_right = false;
		}else{
			this.last_right = false;
		}
	};
	
	p.tickKI = function(event, state){
		that = this;
		
		var up = function(){
			that.position = Math.min(1, that.position + kiVelocity);
		};
		
		var down = function(){
			that.position = Math.max(0, that.position - kiVelocity);
		};


		var ball   = state.ball;
		var middle = this.getMiddle();
		var from   = this.getFrom();
		var to     = this.getTo();
		
		var d = ball.getPosition().distanceSq( from ) -  ball.getPosition().distanceSq( to );
		
		if(Math.abs(d) < this.length * this.length){
			//noop;
			if(this.last_ki_move !== NOOP){
				if(Math.random() > 0.4){ // 60% go on with move
					if(this.last_ki_move === UP)
						up();
					if(this.last_ki_move === DOWN)
						down();
				} 
			}
			this.last_ki_move = NOOP;
		} else if( d < 0 ){
		 	down();
		 	this.last_ki_move = DOWN;	
		} else {
			up();
			this.last_ki_move = UP;
		}	
	};
	
	
	p.getFrom = function(){
		this.from.x = this.x;
		this.from.y = this.y;
		return this.from;
	};
	
	p.getTo = function(){
		this.to.x = this.x + this.v_p.x;
		this.to.y = this.y + this.v_p.y; 
		return this.to;
	};
	
	p.getMiddle = function(){
		this.middle.x = this.x + 0.5 * this.v_p.x;
		this.middle.y = this.y + 0.5 * this.v_p.y; 
		return this.middle;
	};
	
	
	
	
	okta.Paddle = createjs.promote(Paddle, "Container");
		
})(okta);
