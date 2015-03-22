/*
 * Adjust to window size
 */
jQuery(function(){
	var BORDER_FACTOR = 0.95;
	
	var mainWidth = jQuery('.container').width();
	var mainHeight = jQuery('.container').height();
	
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	
	var widthRatio  =  windowWidth / mainWidth;
	var heightRatio =  windowHeight /  mainHeight;
	
	var ratio = Math.min(widthRatio, heightRatio);
	
	ratio = ratio * BORDER_FACTOR;
	
	
	jQuery('.container').css('transform','scale('+ratio+')');
});
