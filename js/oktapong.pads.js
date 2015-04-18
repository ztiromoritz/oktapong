(function(okta) {

	// http://www.html5rocks.com/en/tutorials/doodles/gamepad/
	BUTTONS = {
		FACE_1 : 0, // Face (main) buttons
		FACE_2 : 1,
		FACE_3 : 2,
		FACE_4 : 3,
		LEFT_SHOULDER : 4, // Top shoulder buttons
		RIGHT_SHOULDER : 5,
		LEFT_SHOULDER_BOTTOM : 6, // Bottom shoulder buttons
		RIGHT_SHOULDER_BOTTOM : 7,
		SELECT : 8,
		START : 9,
		LEFT_ANALOGUE_STICK : 10, // Analogue sticks (if depressible)
		RIGHT_ANALOGUE_STICK : 11,
		PAD_TOP : 12, // Directional (discrete) pad
		PAD_BOTTOM : 13,
		PAD_LEFT : 14,
		PAD_RIGHT : 15
	};

	var LEFT_BUTTONS = [BUTTONS.FACE_1, 
		BUTTONS.FACE_3, 
		BUTTONS.LEFT_SHOULDER,
		BUTTONS.RIGHT_SHOULDER_BOTTOM,  // sic.
		BUTTONS.LEFT_ANALOGUE_STICK, 
		BUTTONS.PAD_TOP, 
		BUTTONS.PAD_LEFT];
		
	var RIGHT_BUTTONS = [BUTTONS.FACE_2, 
		BUTTONS.FACE_4, 
		BUTTONS.RIGHT_SHOULDER,
		BUTTONS.LEFT_SHOULDER_BOTTOM, 
		BUTTONS.RIGHT_ANALOGUE_STICK, 
		BUTTONS.PAD_BOTTOM, 
		BUTTONS.PAD_RIGHT];
	//Globals
	PAD1_LEFT = 501;
	PAD1_RIGHT = 502;

	PAD2_LEFT = 503;
	PAD2_RIGHT = 504;

	PAD3_LEFT = 505;
	PAD3_RIGHT = 506;

	PAD4_LEFT = 507;
	PAD4_RIGHT = 508;
	
	
	var virtualCodes = [
		[501,502], [503,504], [505,506], [507,508]
	];


	var buttonPressed = function(b) {
			  if (typeof(b) == "object") {
			    return b.pressed;
			  }
			  return b == 1.0;
	};

	okta.pads = {};

	okta.pads.tick = function(event, state) {
		

		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

		for (var i = 0; i < gamepads.length && i < 4; i++) {
			
			var pad = gamepads[i];
			if(pad === undefined)
				continue;
			var buttonCount =  pad.buttons.length;
			
			var codeLeft = virtualCodes[i][0];
			var codeRight = virtualCodes[i][1];
							
			state.keys.remove(codeLeft);
			state.keys.remove(codeRight); 
			for(var n = 0; n < LEFT_BUTTONS.length; n++){
				var index = LEFT_BUTTONS[n];
				if(index >= buttonCount)
					continue;
				if(buttonPressed(pad.buttons[index])){
					state.keys.add(codeLeft);
				}
			}
			
			for(var n = 0; n < RIGHT_BUTTONS.length; n++){
				var index = RIGHT_BUTTONS[n];
				if(index >= buttonCount)
					continue;
				if(buttonPressed(pad.buttons[index])){
					state.keys.add(codeRight);
				}
			}
		
		};

	};

	okta.pads.info = function() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

		var info = "";
		for (var i = 0; i < gamepads.length; i++) {
			var pad = gamepads[i];
			info += "Gamepad " + (i + 1) + " [" + pad.id + "] <br>";
		};
		return info;
	};

})(okta);
