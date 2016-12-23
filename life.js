// Conway's game of life simulation
// TODO: 
// - Parameterize inputs
// - Choose template --> generate grid and simulate (done)
// - Refresh output for each iteration (no separate printing)
// - Better UI
// - Refactor
// - Customizable grid shape

var allAliveTemplate = ['OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO',
						'OOOOOOOOOO'];
var template = allAliveTemplate;

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
		return (liveCount==2 || liveCount==3); // doesn't die either by under or over population
	}
	return liveCount==3; // reincarnates due to reprodution
};

function evaluateCell(cell, currentGrid){
	if (cell.x == 0){ // left column
		if (cell.y == 0){ // top left, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x+1], currentGrid[cell.y+1][cell.x+1], currentGrid[cell.y+1][cell.x] ]);
		}
		else if (cell.y == currentGrid.length-1){ // bottom left, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x+1], currentGrid[cell.y-1][cell.x+1], currentGrid[cell.y-1][cell.x] ]);
		}
		else{ // leftmost column except 2 corners, check 5 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y-1][cell.x], currentGrid[cell.y-1][cell.x+1], currentGrid[cell.y][cell.x+1], currentGrid[cell.y+1][cell.x+1], currentGrid[cell.y+1][cell.x] ]);
		}
	}
	else if (cell.x == currentGrid.length-1){ // right column
		if (cell.y == 0){ // top right, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x-1], currentGrid[cell.y+1][cell.x-1], currentGrid[cell.y+1][cell.x] ]);
		}
		else if (cell.y == currentGrid.length-1){ // bottom right, only check 3 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x-1], currentGrid[cell.y-1][cell.x-1], currentGrid[cell.y-1][cell.x] ]);
		} 
		else{ // rightmost column except 2 corners, check 5 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y+1][cell.x], currentGrid[cell.y+1][cell.x-1], currentGrid[cell.y][cell.x-1], currentGrid[cell.y-1][cell.x-1], currentGrid[cell.y-1][cell.x] ]);
		}
	}
	else{ // anything in between left and right column
		if (cell.y == 0){ // top row except 2 corners, check 5 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x-1], currentGrid[cell.y+1][cell.x-1], currentGrid[cell.y+1][cell.x], currentGrid[cell.y+1][cell.x+1], currentGrid[cell.y][cell.x+1] ] );
		}
		else if (cell.y == currentGrid.length-1){ // bottom row except 2 corners, check 5 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x-1], currentGrid[cell.y-1][cell.x-1], currentGrid[cell.y-1][cell.x], currentGrid[cell.y-1][cell.x+1], currentGrid[cell.y][cell.x+1] ] );
		}
		else{ // any non-edge cell, check full 8 neighbors
			cell.isLive = determineNextState(cell, [ currentGrid[cell.y][cell.x-1], currentGrid[cell.y-1][cell.x-1], currentGrid[cell.y-1][cell.x], currentGrid[cell.y-1][cell.x+1], currentGrid[cell.y][cell.x+1], currentGrid[cell.y+1][cell.x+1], currentGrid[cell.y+1][cell.x], currentGrid[cell.y+1][cell.x-1] ]);
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
			// Need to push new cell here
			// If otherwise just push grid[y][x], newGrid with become just a reference to grid
			// When testing with lower rows, this will affect since earlier rows have been updated before
			row.push(new Cell(x,y,grid[y][x].isLive,grid[y][x].toTest));
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
			var cell = new Cell(y,x, template[y][x]==='O' ? true : false, false); // Initiate based on template
			row.push(cell);
		}
		grid.push(row);
	}
	// grid[height-1][0] = new Cell(height-1,0,false, true); // testing - dead cell should reincarnate
	/*grid[9][8].toTest = true;
	grid[0][1].toTest = true;*/
	return grid;
};


function start(height, width){
	var turn = 0;
	grid = bigbang(height, width); // currently only support square grids (height == width)
	console.log('-----------BEGIN-----------\n');
	animate(grid);
	setInterval(function(){
		turn++;
		console.log('-----------'+turn+'-----------\n');
		animate(successor(grid));
	}, 500);
};

start(template.length, template[0].length);
