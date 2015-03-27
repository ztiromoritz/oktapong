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
		    .moveTo(50, 150)
		    .lineTo(150,50)
		    .moveTo(350,50)
		    .lineTo(450,150)
		    .moveTo(450,350)
		    .lineTo(350,450)
		    .moveTo(150,450)
		    .lineTo(50,350);
	};
	
	okta.Field = createjs.promote(Field, "Container");
	
})(okta);
