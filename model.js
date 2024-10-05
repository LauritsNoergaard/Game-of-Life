import {Grid} from './grid.js';
export {makeGrid, getCell, setCell, updateGrid, removeAllLivingCells, gridEmpty};

let grid = [];

function makeGrid(row, col) {
    let randomCellValue;
    grid = new Grid(row, col);
    for (let i = 0; i < grid.rows(); i++) {
        for (let j = 0; j < grid.cols(); j++) {
            randomCellValue = Math.floor(Math.random()*2);
            grid.set(i, j, randomCellValue)
        }  
    }
    return grid;
}

function getCell(row, col) {
    return grid.get(row, col);
}

function setCell(row, col, value) {
    grid.set(row, col, value)
    console.log("Set cell to " + value)
    return grid;
}

function updateGrid(grid) { 
    let nextGrid = grid;
    nextGrid = updateCells(grid, nextGrid)

   return nextGrid;
}

function updateCells(grid, nextGrid) {
    for (let i = 0; i < grid.rows(); i++) {
        for (let j = 0; j < grid.cols(); j++) {
            let liveNeighbours = getLiveNeighbours(i, j, grid);

            // ChatGPT
            /* if (grid.get(i,j) === 1) { // If the cell is alive
                if (liveNeighbours < 2 || liveNeighbours > 3) {
                    nextGrid.set(i, j, 0); // Die
                } else {
                    nextGrid.set(i, j, 1); // Stay alive
                }
            } else { // If the cell is dead
                if (liveNeighbours === 3) {
                    nextGrid.set(i, j, 1); // Become alive
                } else {
                    nextGrid.set(i, j, 0); // Stay dead
                }
            } */

            // MY solution:
            if (liveNeighbours < 2 || liveNeighbours > 3) {
                nextGrid.set(i, j, 0);
            } else if (liveNeighbours === 2  || liveNeighbours === 3){
                nextGrid.set(i, j, grid.get(i, j));
                if(grid.get(i,j) === 0) {
                    nextGrid.set(i, j, 1);
                }
            } else {
                nextGrid.set(i, j, 1);
            }
        }
    }
    
    //console.log("Cells in grid have been updated")
    return nextGrid;
}

function getLiveNeighbours(row, col) {
    let amountOfLiveNeighbours = 0;
    let neighbourValues = grid.neighbourValues(row, col);
    
    neighbourValues.forEach(neighbour => {
        if (neighbour === 1) {
            amountOfLiveNeighbours += 1;
        }
    });

    return amountOfLiveNeighbours; 
}

function removeAllLivingCells(grid) {
    //let nextGrid = grid;
    
    for (let i = 0; i < grid.rows(); i++) {
        for (let j = 0; j < grid.cols(); j++) {

            grid.set(i, j, 0);
        }
    }
    //return grid;
}

function gridEmpty(grid) {
    let liveNeighbours = 0;
    for (let i = 0; i < grid.rows(); i++) {
        for (let j = 0; j < grid.cols(); j++) {
            liveNeighbours += getLiveNeighbours(i, j, grid)
        }
    }
    if (liveNeighbours > 0) {
        return false;
    } else {
        return true;
    }
}