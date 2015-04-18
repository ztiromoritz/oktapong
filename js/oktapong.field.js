(function(okta){
	
	var Field = function (options){		
		options = options || {};
		
		this.Container_constructor();
		this.body = new createjs.Shape();
		this.addChild(this.body);
		this.x = options.x || 0; 
		this.y = options.y || 0; 
		this.r = options.r || 500;
		
		this.initBody();	
	};
	
	var f = createjs.extend(Field, createjs.Container);	

	f.initBody = function(){
		this.body.graphics
		 	.beginStroke("#7F3BA4")
		 	.setStrokeStyle(4)
		    .moveTo(NE.p1.x, NE.p1.y)
		    .lineTo(NE.p2.x, NE.p2.y)
		    .moveTo(SE.p1.x, SE.p1.y)
		    .lineTo(SE.p2.x, SE.p2.y)
		    .moveTo(SW.p1.x, SW.p1.y)
		    .lineTo(SW.p2.x, SW.p2.y)
		    .moveTo(NW.p1.x, NW.p1.y)
		    .lineTo(NW.p2.x, NW.p2.y);
		

	};
	
	f.getObstacles = function(){
		return [
			Segment.fromObject( NW ),
			Segment.fromObject( SW ),
			Segment.fromObject( SE ),
			Segment.fromObject( NE )
			];
	};
	
	okta.Field = createjs.promote(Field, "Container");
	
})(okta);
