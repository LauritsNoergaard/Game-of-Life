export {drawGrid, countGenerations};

function drawGrid(grid) {
    const htmlGridContainer = document.getElementById("grid-container");
    htmlGridContainer.innerHTML="";

    // I've checked the cols and rows and they're the correct number, for some reason it just doesn't look like a square?
    htmlGridContainer.style.gridTemplateColumns = `repeat(${grid.cols()}, 20px)`; 
    htmlGridContainer.style.gridTemplateRows = `repeat(${grid.rows()}, 20px)`;

    //console.log(grid.rows());
    for (let i = 0; i < grid.rows(); i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        // Makes the cell black or white depending on whether its value is 0 or 1
        for (let j = 0; j < grid.cols(); j++) {
            const cellDiv = document.createElement("div");

            if(grid.get(i, j) == 0) {
                cellDiv.classList.add("cell-dead");
            } else {
                cellDiv.classList.add("cell-alive");
            }
            
            rowDiv.appendChild(cellDiv);
        }
        htmlGridContainer.appendChild(rowDiv);
    }
}

function countGenerations(generations) {
    document.getElementById("generations").innerHTML = "Generations: " + generations;
}


