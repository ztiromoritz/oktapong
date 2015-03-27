(function(okta){
	
	var velocity = 0.05;

	
	var Paddle = function(options){
		options = options || {};
		
		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);
		
		this.length   = options.length 	 || 40;
		this.start    = options.start 	 || okta.NORTH.start;
		this.stop     = options.stop 	 || okta.SOUTH.stop;
		this.position =  0.5; 
		this.leftKey  = options.leftKey  || 37;
		this.rightKey = options.rightKey || 39;
		this.color    = options.color    || "#5c8b00";
		
		this.goalLine  = new Segment(this.stop, this.start);
		this.v  	   = this.stop.clone().sub(this.start);
		this.v_n 	   = this.v.clone().normalize();
		this.last_left = false;
		this.last_right = false;
		
		this.initBody();
	};
	
	var p = createjs.extend(Paddle, createjs.Container);
	

	p.updatePosition = function(){
		
		
		var range = this.v.length() - this.length;
		var w = this.v_n.clone().mul(range * this.position);
		
		var p1 = this.start.clone().add( w );
		
		this.x = p1.x;
		this.y = p1.y;
	};
	
	
	p.initBody = function(){
		this.body.graphics
		 	.beginStroke(this.color)
		 	.setStrokeStyle(4)
		    .moveTo(0,0)
		    .lineTo(this.v_n.x * this.length, this.v_n.y * this.length);	
		this.updatePosition();
	};
	
	
	
	p.tick = function(even, state){
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
		this.updatePosition();
	};
	
	p.getSegment = function(){
		var s = new Segment(
			new Vect(this.x, this.y),
			new Vect(this.x, this.y).add(new Vect(this.v_n.x * this.length, this.v_n.y * this.length)) );
		return s;
	};
	
	
	
	
	okta.Paddle = createjs.promote(Paddle, "Container");
		
})(okta);
