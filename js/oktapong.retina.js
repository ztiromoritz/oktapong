//TODO: check for retina handler

	if ( false && canvas.getContext) {
		 var ctx = canvas.getContext('2d');
		 
		 var factor = 1;
		 
		 // retina display?
		 var isRetina = (window.devicePixelRatio > 1);
		 
		 // iOS? (-> no auto double)
		 var isIOS = ((ctx.webkitBackingStorePixelRatio < 2) || (ctx.webkitBackingStorePixelRatio == undefined));
		 
		 if (isRetina && isIOS) {
		  factor =2;	
		 }	
		 
		 canvas.style.width = "500px";
		 canvas.style.height = "500px";
		 canvas.setAttribute('width', 500*factor);
 		 canvas.setAttribute('height',500*factor);
 		 ctx.scale(factor, factor);
 		 //ctx.translate(0.5, 0.5);
 		 ctx.transform(window.devicePixelRatio,0,0,window.devicePixelRatio,0,0);
 		 console.log(ctx.imageSmoothingEnabled);
		 //ctx.imageSmoothingEnabled = false;
		 ctx.translate(2, 2);
		 ctx.lineWidth = 1;
	}
	