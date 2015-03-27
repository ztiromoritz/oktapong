/**
 * Minimal Set Implementation
 * ///http://stackoverflow.com/questions/7958292/mimicking-sets-in-javascript
 */
var MinimalSet = function(){
	this.data = Object.create(null);
};

MinimalSet.prototype.add = function(key){
	this.data[key] = true;
};

MinimalSet.prototype.contains = function(key){
	return (key in this.data);	
};

MinimalSet.prototype.remove = function(key){
	delete this.data[key];
};

MinimalSet.prototype.clear = function(){
	this.data = Object.create(null);
};
