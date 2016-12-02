// Conway's game of life simulation

function Cell(x,y,isLive){
	this.x = x;
	this.y = y;
	this.isLive = isLive || false;
	this.symbol = this.isLive ? '*' : '#';
};

// Overwrite a cell in grid with provided cell (in same coordinates)
function replaceCell(grid, cell){
	grid[cell.x][cell.y] = cell;
};

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

	var anomalyCell = new Cell(getRand(0,height), getRand(0,width), true);
	replaceCell(grid, anomalyCell);

	return grid;
};

function animate(grid){
	for (var i=0; i<grid.length; i++){
		var row = '';
		for (var j=0; j<grid[i].length; j++){
			row += grid[i][j].symbol;
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
			var cell = new Cell(x,y);
			row.push(cell);
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
	}, 500);
};

start(10, 10);
