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