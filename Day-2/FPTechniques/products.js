var products = [
	{id :7, name :"pen", cost :10, units:10, category:1},
	{id :3, name :"hen", cost :70, units:10, category:2},
	{id :6, name :"zen", cost :30, units:20, category:1},
	{id :2, name :"ten", cost :60, units:30, category:2},
	{id :9, name :"len", cost :50, units:10, category:1},
	{id :1, name :"ken", cost :40, units:10, category:2}
]
console.log("Initial list")
console.table(products);

var sort = function(list){
	for(var i=0;i<list.length-1;i++)
		for(var j=i+1;j<list.length;j++){
			if (list[i].id > list[j].id){
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
		}
}

console.log("After sorting..")
sort(products);
console.table(products);


var sort = function(list,attrName){
	for(var i=0;i<list.length-1;i++)
		for(var j=i+1;j<list.length;j++){
			if (list[i][attrName] > list[j][attrName]){
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
		}
}

console.log("After sorting by cost..")
sort(products, "cost");
console.table(products);
/*
	The comparer function has to return 
	-1 if left < right
	0 if left = right
	1 otherwise
*/
var sort = function(list,comparerFn){
	for(var i=0;i<list.length-1;i++)
		for(var j=i+1;j<list.length;j++){
			if (comparerFn(list[i], list[j]) > 0){
				var temp = list[i];
				list[i] = list[j];
				list[j] = temp;
			}
		}
}

function productValueComparer(p1,p2){
	var p1Value = p1.units * p1.cost;
	var p2Value = p2.units * p2.cost;
	if (p1Value < p2Value) return -1;
	if (p1Value === p2Value) return 0;
	return 1;
}

console.log("Sorting using Comparer function for product value...")
sort(products,productValueComparer);
console.table(products);

/*
filter
min

groupBy
join
*/

var filter = function (list){
	var result = [];
	for(var i=0;i<list.length;i++)
		if (list[i].cost > 50)
			result.push(list[i]);
	return result;
}

var costlyProducts = filter(products);
console.log("All costly products")
console.table(costlyProducts);

var filter = function (list, predicate){
	var result = [];
	for(var i=0;i<list.length;i++)
		if (predicate(list[i]))
			result.push(list[i]);
	return result;
}
var cheapProductCriteria = function(p){
	return p.cost <= 50;
}
var cheapProducts = filter(products,cheapProductCriteria);
console.log("All cheap products")
console.table(cheapProducts);

console.log("Min using attribute name")
var min = function(list,attrName){
	var result = list[0][attrName];
	for(var i=1;i<list.length;i++)
		if (list[i][attrName] < result)
			result = list[i][attrName];
	return result;
}
console.log("Min cost = ", min(products,"cost"));


console.log("Min using selector function")
var min = function(list,selectorFn){
	var result = selectorFn(list[0]);
	for(var i=1;i<list.length;i++){
		var value = selectorFn(list[i])
		if (value < result)
			result = value;
	}
	return result;
}
var productValueSelectorFn = function(p){ return p.units * p.cost};
console.log("Min product value = ", min(products,productValueSelectorFn));

var min = function(list,selector){
	var selectorFn = typeof selector === "function" ? selector : function(item){return item[selector]};
	var result = selectorFn(list[0]);
	for(var i=1;i<list.length;i++){
		var value = selectorFn(list[i])
		if (value < result)
			result = value;
	}
	return result;
}


var groupBy = function(list,selector){
	var selectorFn = typeof selector === "function" ? selector : function(item){return item[selector]};
	var result = {};
	for(var i=0;i<list.length;i++){
		var key = selectorFn(list[i])
		if (typeof result[key] === "undefined")
			result[key] = [];
		result[key].push(list[i])
	}
	return result;
}
var productsByCategory = groupBy(products,"category");

var productCatergorizerByCost = function(p){
	return p.cost <= 50 ? "affordable" : "costly";
}
var productsByCost = groupBy(products,productCatergorizerByCost);
console.log("After grouping by cost")
console.table(productsByCost.affordable)
console.table(productsByCost.costly);

var categories = [
	{id : 1, name : "stationary"},
	{id : 2, name : "grocery"}
]

var join = function(leftList, rightList, leftKeyAttrName, rightKeyAttrName, transformerFn){
	var result = [];
	for(var i=0;i<leftList.length;i++){
		var leftItem = leftList[i],
			leftKey = leftItem[leftKeyAttrName];
		for(var j=0;j<rightList.length;j++){
			var rightItem = rightList[j],
				rightKey = rightItem[rightKeyAttrName];
			if (leftKey === rightKey)
				result.push(transformerFn(leftItem, rightItem));
		}
	}
	return result;
}

console.log("joining products and categories")
var productsWithCategoryNames = join(products,categories,"category","id",function(p,c){
	return {id : p.id, name : p.name, cost : p.cost, units : p.units, category : c.name};
});
console.table(productsWithCategoryNames);

function memoize(fn){
	var cache = {};
	return function(){
		if (typeof cache[arguments[0]] !== "undefined") {
			console.log("from cache");
			return cache[arguments[0]];
		}
		var result = fn.apply(this,[].slice.call(arguments,0));
		cache[arguments[0]] = result;
		console.log("juz processed");
		return result;
	}
}



/*

max (HW)
sum (HW)
avg (HW)
countBy (HW - use predicates)
all (HW - use predicates)
any (HW - use predicates)

each (underscore - Collections)
map (underscore - Collections)
reduce (underscore - Collections)
reject (underscore - Collections)

memoize (underscore - Functions)
once (underscore - Functions)
after (underscore - Functions)
compose (underscore - Functions)

Try solving the problems with using "for"

Write your own Promise Implementation

*/