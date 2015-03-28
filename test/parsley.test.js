var assert = require("assert");
var Parsley = require("../js/utils/parsley").Parsley;
Vect = Parsley.Vect;
Box = Parsley.Box;
Segment = Parsley.Segment;

describe('Vect#constructor', function(){
 it('should keep values', function(){
	var v = new Vect(0,0);
	assert.equal(0,v.x);
	assert.equal(0,v.y);
  });
  it('should have defaults', function(){
	var v = new Vect();
	assert.equal(0,v.x);
	assert.equal(0,v.y);
  });
});


describe('Vect#isLeftOf/isRightOf', function(){
	var a = new Vect(1,0);
	var b = new Vect(1,1);
	var c = new Vect(1,2);
	var d = new Vect(0,1);
	var e = new Vect(-1,1);
	var f = new Vect(-2,1);
	var g = new Vect(-1,0);
	var h = new Vect(-1,-1);
	var i = new Vect(0,-1);
	var j = new Vect(2,-1);
	var all = [a,b,c,d,e,f,g,h,i,j];
	
	Parsley.setXisLeftOfY(true);
	
	it('should find the correct right values',
		function(){
			assert(b.isRightOf(a));
			assert(c.isRightOf(a));
			assert(d.isRightOf(a));
			assert(e.isRightOf(a));
			assert(f.isRightOf(a));
		}
	);
	
	it('should find the correct left values', 
		function(){
			assert(h.isLeftOf(a));
			assert(i.isLeftOf(a));
			assert(j.isLeftOf(a));
		}
	);
	
	it('should be "anti-reflexive" on true', 
		function(){
			var l = all.length;
			for(n = 0;n<l;n++){
				for(m = 0; m<l;m++){
					var v1 = all[n];
					var v2 = all[m];
					if(v1.isRightOf(v2)){
						assert(v2.isLeftOf(v1), "Althoug v1: "+v1 + " isRightOf v2:" + v2 + " v2.isLeftOf(v1) is false" );
					}
				}
			}
		}
	);

	it('should fail on paralles', 
		function(){
			assert(!g.isLeftOf(a));
			assert(!g.isRightOf(a));
			
			
		}
	);
	
	it('especcially on itself', function(){
		assert(!a.isLeftOf(a));
		assert(!a.isRightOf(a));
	});
});


describe('Vect#isLeftOf/isRightOf the other way around', function(){
	var a = new Vect(1,0);
	var b = new Vect(1,1);
	var c = new Vect(1,2);
	var d = new Vect(0,1);
	var e = new Vect(-1,1);
	var f = new Vect(-2,1);
	var g = new Vect(-1,0);
	var h = new Vect(-1,-1);
	var i = new Vect(0,-1);
	var j = new Vect(2,-1);
	var all = [a,b,c,d,e,f,g,h,i,j];
	
	before(function(){
		Parsley.setXisLeftOfY(false);
	});
	
	after(function(){
		Parsley.setXisLeftOfY(true);
	});
	
	it('should find the correct right values',
		function(){
			
			assert(b.isLeftOf(a));
			assert(c.isLeftOf(a));
			assert(d.isLeftOf(a));
			assert(e.isLeftOf(a));
			assert(f.isLeftOf(a));
			
		}
	);
	
	it('should find the correct left values', 
		function(){
			Parsley.setXisLeftOfY(false);
			assert(h.isRightOf(a));
			assert(i.isRightOf(a));
			assert(j.isRightOf(a));
		}
	);
	
	it('should be "anti-reflexive" on true', 
		function(){
			var l = all.length;
			for(n = 0;n<l;n++){
				for(m = 0; m<l;m++){
					var v1 = all[n];
					var v2 = all[m];
					if(v1.isLeftOf(v2)){
						assert(v2.isRightOf(v1), "Althoug v1: "+v1 + " isLeftOf v2:" + v2 + " v2.isRightOf(v1) is false" );
					}
				}
			}
		}
	);

	it('should fail on paralles', 
		function(){
			assert(!g.isLeftOf(a));
			assert(!g.isRightOf(a));
			
			
		}
	);
	
	it('especcially on itself', function(){
		assert(!a.isLeftOf(a));
		assert(!a.isRightOf(a));
	});
	
	
});


describe('Vector#turnLeft',function(){
	var u = new Vect(0,1);
	var v = new Vect(1,0);
	var w = new Vect(2,3);
	
	var u_l = u.clone().turnLeft();
	var v_l = v.clone().turnLeft();
	var w_l = w.clone().turnLeft();
	
	it('is left of',function(){
		assert(u_l.isLeftOf(u));
		assert(v_l.isLeftOf(v));
		assert(w_l.isLeftOf(w));
	});
	
	it('has same length', function(){
		assert.equal(u.length(),u_l.length());
		assert.equal(v.length(),v_l.length());
		assert.equal(w.length(),w_l.length());
	});
	
	it('is turned 90°', function(){
		assert.equal(0,u.dot(u_l));
		assert.equal(0,v.dot(v_l));
		assert.equal(0,w.dot(w_l));
	});
		
});


describe('Vector#turnRight',function(){
	var u = new Vect(0,1);
	var v = new Vect(1,0);
	var w = new Vect(2,3);
	
	var u_l = u.clone().turnRight();
	var v_l = v.clone().turnRight();
	var w_l = w.clone().turnRight();
	
	it('is right of',function(){
		assert(u_l.isRightOf(u));
		assert(v_l.isRightOf(v));
		assert(w_l.isRightOf(w));
	});
	
	it('has same length', function(){
		assert.equal(u.length(),u_l.length());
		assert.equal(v.length(),v_l.length());
		assert.equal(w.length(),w_l.length());
	});
	
	it('is turned 90°', function(){
		assert.equal(0,u.dot(u_l));
		assert.equal(0,v.dot(v_l));
		assert.equal(0,w.dot(w_l));
	});
		
});


describe('Vect#reflectOn', function(){
	

	
	it('should do boing', function(){
		var ref = new Vect(1,0);
		var u = new Vect(1,2);
		
		var u_r = u.clone().reflectOn(ref);
		
		assert.equal(  1, u_r.x);
		assert.equal( -2, u_r.y);
	});
	
	it('should do buff', function(){
		var ref = new Vect(0,1);
		var u = new Vect(1,-3);
		
		var u_r = u.clone().reflectOn(ref);
		
		assert.equal( -1, u_r.x);
		assert.equal( -3, u_r.y);
	});
	
	it('should do whiuuuuuuuu', function(){
		var EPSILON = 0.0001;
		var ref = new Vect(1,1);
		var u = new Vect(1,0);
		
		var u_r = u.clone().reflectOn(ref);
		
		assert( Math.abs(u_r.x) < EPSILON);
		assert(	Math.abs( u_r.y - 1) < EPSILON);
	});
	 
	 
	 it('should do hää', function(){
	 	var ref = new Vect(2,3);
		var u = new Vect(2,3);
		var u_r = u.clone().reflectOn(ref);
		assert.equal( -2, u_r.x);
		assert.equal( -3, u_r.y);
	});
	
});



describe('Segment#fromArray', function(){
	var segment = Segment.fromArray([3,3,0,0]);
	it('should keep values', function(){
		assert.equal(3,segment.p1.x);
		assert.equal(3,segment.p1.y);
		assert.equal(0,segment.p2.x); 
		assert.equal(0,segment.p2.y); 
	});
});


describe('Segment#intersect', function(){
	
	it('works', function(){
		var v = new Segment( new Vect(3,3), new Vect(4,3));
		assert.equal(0,v.toCenter().p1.x);
		assert.equal(0,v.toCenter().p1.y);
		assert.equal(1,v.toCenter().p2.x);
		assert.equal(0,v.toCenter().p2.y);
	});
	
	
	it('keeps length', function(){
		var v = new Segment( new Vect(3,3), new Vect(4,3));
		assert.equal(v.length(),v.toCenter().length());
	});

	
	
});


describe('Box#containsPoint', function(){
	var box = new Box(0,3,0,3);
	var ins =  [new Vect(0,0), new Vect(0,3), new Vect(3,3), new Vect(3,0)];
	var outs = [new Vect(0,-1), new Vect(0,4), new Vect(1,4)];
	

	it('should sort in', function(){
		var l = ins.length;
		while(l--){
			assert( box.containsPoint(ins[l]), ins[l]+' in ' + box);
			
		};
	});	

	it('and sort out', function(){
		var l = outs.length;
		while(l--){
			assert(!box.containsPoint(outs[l]), outs[l]+ ' out ' + box);
			
		}
	});
});


describe('Box#intersect', function(){
	var box1 = new Box(3,5,3,5);
	var box2 = new Box(4,6,4,6);
	var box3 = new Box(0,4,0,4);
	var box4 = new Box(5,6,5,6);
	var box5 = new Box(10,12,10,13);


	it('should work with intersected', function(){
		assert( box1.intersect(box3) ,  box1 + ' with ' +box3);
		assert( box2.intersect(box3) ,  box2 + ' with ' +box3);
		assert( box1.intersect(box2) ,  box1 + ' with ' +box2);
		}	
	);
	
	it('even only a corner', function(){
		assert( box1.intersect(box4) ,  box1 + ' out ' +box4);
	});
	
	it('should work with non intersected', function(){
		assert( !box2.intersect(box5) ,  box2 + ' out ' +box5);
		assert( !box3.intersect(box5) ,  box3 + ' out ' +box5);
		}	
	);
	
});






describe('Segment#intersect', function(){
	
	it('cross should intersect', function(){
		var seg1 = Segment.fromArray([3,3,0,0]);
		var seg2 = Segment.fromArray([3,0,0,3]);
		assert(seg1.intersect(seg2));
	});
	
	it('and also vice versa', function(){
		var seg1 = Segment.fromArray([3,3,0,0]);
		var seg2 = Segment.fromArray([3,0,0,3]);
		assert(seg2.intersect(seg1));
	});
	
	describe('parallel', function(){
		
		it('should not intersect', function(){
			var seg1 = Segment.fromArray([3,3,0,0]);
			var seg2 = Segment.fromArray([3,4,0,1]);
			assert(!seg1.intersect(seg2));
		});
		
		it('except they lay on each other', function(){
			var seg1 = Segment.fromArray([3,3,0,0]);
			var seg2 = Segment.fromArray([0,0,1,1]);
			assert(seg1.intersect(seg2));
		});
		
		it('or are even identical', function(){
			var seg1 = Segment.fromArray([3,3,0,0]);
			var seg2 = Segment.fromArray([0,0,1,1]);
			assert(seg1.intersect(seg2));
		});
	});
	
	
});


describe('fiddle', function(){
	var v = new Vect(2,0);	
	var w = new Vect(0,2);
	it('cc', function(){
		console.log(v.clone().rotate(Math.PI/2));
		console.log(w.clone().rotate(Math.PI/2));
		assert(true);
		console.log(v.clone().rotateTo(Math.PI/2));
		console.log(w.clone().rotateTo(Math.PI/2));
		console.log(w.clone().rotateTo(45*Math.PI/180));
		console.log(w.clone().rotateTo(Math.PI));
	});
	
} );




