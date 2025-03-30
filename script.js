document.addEventListener("DOMContentLoaded", () => {
    generateMatrices();
});

function generateMatrices() {
    let size = document.getElementById("size").value;
    let matrixA = document.getElementById("matrixA");
    let matrixB = document.getElementById("matrixB");
    let resultDiv = document.getElementById("result");

    matrixA.innerHTML = "<h3>Matrix A</h3>";
    matrixB.innerHTML = "<h3>Matrix B</h3>";
    resultDiv.innerHTML = "<h3>Result</h3>"; 

    matrixA.appendChild(createMatrix(size, "A"));
    matrixB.appendChild(createMatrix(size, "B"));
    resultDiv.appendChild(createMatrix(size, "Result", true)); // Generate result matrix with default 0s
}

function createMatrix(size, label, isResult = false) {
    let matrix = document.createElement("div");
    matrix.classList.add("matrix");
    matrix.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    for (let i = 0; i < size * size; i++) {
        let cell;
        if (isResult) {
            cell = document.createElement("div");
            cell.innerText = "0";  // Default value before calculation
        } else {
            cell = document.createElement("input");
            cell.type = "number";
        }
        matrix.appendChild(cell);
    }
    return matrix;
}

function calculate() {
    let size = document.getElementById("size").value;
    let operation = document.getElementById("operation").value;
    let matrixA = document.querySelector("#matrixA .matrix").querySelectorAll("input");
    let matrixB = document.querySelector("#matrixB .matrix").querySelectorAll("input");
    let resultCells = document.querySelector("#result .matrix").querySelectorAll("div");

    for (let i = 0; i < size * size; i++) {
        let a = parseInt(matrixA[i].value || 0);
        let b = parseInt(matrixB[i].value || 0);
        let resultValue = operation === "add" ? a + b : a - b;
        resultCells[i].innerText = resultValue; // Update result matrix values
    }
}
