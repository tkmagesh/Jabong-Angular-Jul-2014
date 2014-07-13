var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	path = require("path"),
	querystring = require("querystring"),
	knownFileExtenstions = [".html",".css",".img",".js"],
	tasks = [
		{name : "Task - 1", isCompleted : false, category : "Personal"},
		{name : "Task - 2", isCompleted : false, category : "Official"},
	];

String.prototype.endsWith = function(extn){
   return this.substr(this.length - extn.length, extn.length) === extn;
}

http.createServer(function(req,res){
	var pathName = url.parse(req.url).pathname;
	var resourceName = path.join(__dirname, pathName);
	var isFile = knownFileExtenstions.some(function(ext){
		return resourceName.endsWith(ext);
	});
	if (isFile){
		fs.exists(resourceName, function(){
			fs.createReadStream(resourceName, {encoding : "utf8"}).pipe(res);
		});	
	} else {
		if (pathName === "/tasks"){
			res.write(JSON.stringify(tasks));
			res.end();
		}
	}
	
}).listen(8080);
console.log("Server listening on port 8080..");