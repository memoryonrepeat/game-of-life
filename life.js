// Conway's game of life simulation

function getRand(min, max){
	return Math.floor(Math.random()*(max - min)+min);
};

function successor(grid){
	// At each turn, loop through all living cells and apply the rules
	// Can animate to distinguish dead and newborn cells
	// ASK:
	// - How to efficiently filter out dead cells ?
	var height = grid.length;
	var width = grid[0].length;
	var newCell = [getRand(0,height-1), getRand(0,width-1)];
	console.log(newCell);
	grid[newCell[0]][newCell[1]]='#';
	// console.log(grid[newCell[0],newCell[1]]);
	return grid;
};

function animate(grid){
	for (var i=0; i<grid.length; i++){
		var row = '';
		for (var j=0; j<grid[i].length; j++){
			row += grid[i][j];
		}
		console.log(row);
	}
};

function bigbang(height, width){
	var grid = [];
	// Boom the universe
	for (var x=0; x<height; x++){
		var row = [];
		for (var y=0; y<width; y++){
			row.push('*');
		}
		grid.push(row);
	}
	return grid;
};

function start(height, width){
	var turn = 0;
	grid = bigbang(height, width);
	console.log('-----------BEGIN-----------');
	animate(grid);
	setInterval(function(){
		turn++;
		console.log('-----------'+turn+'-----------');
		animate(successor(grid));
	}, 1000);
};

start(10, 10);
