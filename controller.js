import * as model from './model.js';
import * as view from './view.js';

// Yes it's a global variable, but I'm not sure right now how to make it a local variable and still make it work with tick()
let grid = [];
let generations = 0;

window.addEventListener("load", start);

function start() {
  let randomGridStart = 20 // To get random grid size: Math.floor(Math.random()*40);
  console.log(`Javascript kører`);
  grid = model.makeGrid(randomGridStart, randomGridStart);

  view.drawGrid(grid);

  document.getElementById("remove-all-cells").addEventListener("submit", (event) => {
    event.preventDefault();  
    model.removeAllLivingCells(grid);  
    view.drawGrid(grid);
    generations = 0;
  });

  document.getElementById("add-cell").addEventListener("submit", (event) => {
    event.preventDefault(); 
    console.log("Controller line 24 triggered")

    let cell = document.getElementById("add-cell-text").value;
    let cellSplit = cell.split(",");

    grid = model.setCell(cellSplit[0], cellSplit[1], cellSplit[2])  
    view.drawGrid(grid);
  });

  // FIXME: There's a problem, when you remove all cells and then add some cells, all the cells added just die instantly
  document.getElementById("start-game").addEventListener("submit", (event) => {
    event.preventDefault();  
    tick();
  });
  
}

function tick() {
  generations++;
  view.countGenerations(generations);
  let newGrid = model.updateGrid(grid);

  if(model.gridEmpty(newGrid)) {
    view.drawGrid(newGrid);
    return console.log("Grid is epmty, stopped ticking");
  } else {
    
    view.drawGrid(newGrid);

    grid = newGrid;
  
    setTimeout(tick, 200); 
  }
}
