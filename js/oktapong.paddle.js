(function(okta){
	
	okta.NORTH = { 
			start: new Victor(150, 50),
			stop : new Victor(350, 50)
	};
	
	var velocity = 0.05;
	
	
	
	var Paddle = function(options){
		options = options || {};
		
		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);
		
		this.length   = options.length || 20;
		this.start    = options.start || okta.NORTH.start;
		this.stop     = options.stop || okta.NORTH.stop;
		this.position =  0.5; 
		this.leftKey  = options.leftKey || 37;
		this.rightKey = options.rightKey || 39;
		
		this.initBody();
	};
	
	var p = createjs.extend(Paddle, createjs.Container);
	
	//TODO: make "private"
	p.getPosition = function(){
		var v = this.stop.clone().subtract(this.start);
		var ll = v.length() - this.length;
		var v_n = v.normalize();
		var w = v_n.clone().multiply(new Victor(ll * this.position,ll * this.position));

		var p1 = this.start.clone().add( w );
		return p1;
	};
	
	
	p.initBody = function(){
		
		console.log("draw");

		this.body.graphics
		 	.beginStroke("#5c8b00")
		 	.setStrokeStyle(4)
		    .moveTo(0,0)
		    .lineTo(this.length, 0);
		
			
			

		var p1 = this.getPosition();
		this.body.x = p1.x;
		this.body.y = p1.y;
		
		//var p2 = p1.clone().add(v.normalize().multiply( new Victor(this.length, this.length)));
		//console.log(this.position);
	
		/*this.body.graphics
		 	.beginStroke("#5c8b00")
		 	.setStrokeStyle(4)
		    .moveTo(p1.x, p1.y)
		    .lineTo(p2.x,p2.y);	
		    */
	};
	
	
	
	p.tick = function(even, state){
		//console.log(state.keys.data);
		//console.log(this.leftKey);

		if(state.keys.contains(this.leftKey)){
			console.log("left");
			this.position = Math.max(0, this.position - velocity);
		}
		
		if(state.keys.contains(this.rightKey)){
			this.position = Math.min(1,this.position + velocity);
		}
		
		console.log(this.position);
		
		var p1 = this.getPosition();
		this.body.x = p1.x;
		this.body.y = p1.y;
		
		
	};
	
	okta.Paddle = createjs.promote(Paddle, "Container");
	
	
		
	
})(okta);
