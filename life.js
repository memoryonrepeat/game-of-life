// Conway's game of life simulation

function Cell(x,y,isLive){
	this.x = x;
	this.y = y;
	this.isLive = isLive || true;
};

// Overwrite a cell in grid with provided cell (in same coordinates)
function replaceCell(grid, cell){
	grid[cell.x][cell.y] = cell;
};

function getRand(min, max){
	return Math.floor(Math.random()*(max - min)+min);
};

function determineNextState(cell, neighbors){
	var liveCount = 0;
	if (cell.isLive){
		for (var i=0; i<neighbors.length; i++){
			if (neighbors[i].isLive){
				liveCount++;
			}
		}
		return (liveCount==2 || liveCount==3); // doesn't die either by under or over population
	}
	return liveCount==3; // reincarnates due to reprodution
};

function evaluateCell(cell, currentGrid){
	if (cell.x == 0){
		if (cell.y == 0){ // top left, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.x+1][cell.y], currentGrid[cell.x+1][cell.y+1], currentGrid[cell.x, cell.y+1] ]);
		}
	}
};

function successor(grid){
	// At each turn, loop through all living cells and apply the rules
	// Can animate to distinguish dead and newborn cells
	// ASK:
	// - How to efficiently filter out dead cells ?
	var height = grid.length;
	var width = grid[0].length;

	var nextGrid = grid;

	for (var j=0; j<height; j++){
		for (var i=0; i<width; i++){
			evaluateCell(nextGrid[i][j], grid);
		}
	}

	/*var anomalyCell = new Cell(getRand(0,height), getRand(0,width), true);
	replaceCell(grid, anomalyCell);*/

	return nextGrid;
};

function animate(grid){
	for (var j=0; j<grid.length; j++){
		var row = '';
		for (var i=0; i<grid[j].length; i++){
			if (grid[i][j].isLive){
				row += 'O';
			}
			else{
				row += '_';
			}
		}
		console.log(row);
	}
};

function bigbang(height, width){
	var grid = [];
	// Boom the universe
	for (var y=0; y<height; y++){
		var row = [];
		for (var x=0; x<width; x++){
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
	console.log('-----------BEGIN-----------\n');
	animate(grid);
	setInterval(function(){
		turn++;
		console.log('-----------'+turn+'-----------\n');
		animate(successor(grid));
	}, 500);
};

start(10, 10);
