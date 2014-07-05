Create an object (How you create it is what that matters) and assign it to a variable "spinner"

var spinner = //fill in the blanks

the object should exhibit the following behavior

spinner.up() //=> 1
spinner.up() //=> 2
spinner.up() //=> 3
spinner.up() //=> 4

spinner.down() //=> 3
spinner.down() //=> 2
spinner.down() //=> 1
spinner.down() //=> 0
spinner.down() //=> -1


var spinner = (function(){
	var counter = 0;
	return {
		up : function(){ return ++counter;},
		down : function(){ return --counter;}
	}
})()

create a function that will return if the given number is a prime number or not.  The results have to cached so as not to process the login once again for the same number. Needless to say that the cache should be "private".


function getPrimeFinder(){
	var cache={};
	function isPrime(n){
		if (typeof cache[n] !== "undefined"){
			console.log("from cache...")
			return cache[n];
		}
		cache[n] = true;
		for(var i=2;i<(n/2);i++)
			if (n % i === 0){
				cache[n] = false;
				break;
			}
		console.log("Juz processed...");
		return cache[n];
	}
	return isPrime;
}

var isPrime = getPrimeFinder()
isPrime(100);
