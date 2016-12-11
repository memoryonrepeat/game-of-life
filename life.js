// Conway's game of life simulation

function Cell(y,x,isLive,toTest){
	this.y = y;
	this.x = x;
	this.isLive = isLive;
	this.toTest = toTest;
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
	if (cell.toTest){
		console.log(neighbors);
	}
	for (var i=0; i<neighbors.length; i++){
		if (neighbors[i].isLive){
			liveCount++;
		}
	}
	if (cell.isLive){
		return (liveCount==2 || liveCount==4); // doesn't die either by under or over population
	}
	return liveCount==3; // reincarnates due to reprodution
};

function evaluateCell(cell, currentGrid){
	if (cell.x == 0){
		if (cell.y == 0){ // top left, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x+1], currentGrid[cell.y+1][cell.x+1], currentGrid[cell.y+1][cell.x] ]);
		}
		else if (cell.y == currentGrid.length-1){ // bottom left, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x+1], currentGrid[cell.y-1][cell.x+1], currentGrid[cell.y-1][cell.x] ]);
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

	// Clone current grid
	// TODO: Find a more efficient way
	var nextGrid = [];
	for (var y=0; y<height; y++){
		var row = [];
		for (var x=0; x<width; x++){
			row.push(grid[y][x]);
		}
		nextGrid.push(row);
	}

	// TODO: verify if works with 2d array
	// var nextGrid = grid.slice();

	for (var j=0; j<height; j++){
		for (var i=0; i<width; i++){
			evaluateCell(nextGrid[j][i], grid);
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
			if (grid[j][i].isLive){
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
			var cell = new Cell(y,x, true, false); // Initiate all live cells
			row.push(cell);
		}
		grid.push(row);
	}
	grid[height-1][0] = new Cell(height-1,0,false, true); // testing - dead cell should reincarnate
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

start(7, 10);
