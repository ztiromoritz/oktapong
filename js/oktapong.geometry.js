(function(global){
		global.NORTH = { 
			start : new Vect(150, 50),
			stop  : new Vect(400, 50)
		};
		
		global.EAST = {
			start  : new Vect(450, 150),
			stop : new Vect(450, 400)
		};
		
		global.SOUTH = {
			start : new Vect(350, 450),
			stop  : new Vect(100, 450)
		};
		
		global.WEST = {
			start : new Vect(50, 350),
			stop  : new Vect(50, 100)
		};
		
		global.NE = {
			p1: NORTH.stop,
			p2: EAST.start
		};
		
		global.SE = {
			p1: EAST.stop,
			p2: SOUTH.start
		};
		
		global.SW = {
			p1: SOUTH.stop,
			p2: WEST.start
		};
		
		global.NW = {
			p1: WEST.stop,
			p2: NORTH.start
		};
		
})(this);
