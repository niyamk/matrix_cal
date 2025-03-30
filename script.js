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
    resultDiv.appendChild(createMatrix(size, "Result", true));

    toggleMatrixB();
}

function createMatrix(size, label, isResult = false) {
    let matrix = document.createElement("div");
    matrix.classList.add("matrix");
    matrix.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    for (let i = 0; i < size * size; i++) {
        let cell;
        if (isResult) {
            cell = document.createElement("div");
            cell.innerText = "0";
        } else {
            cell = document.createElement("input");
            cell.type = "number";
        }
        matrix.appendChild(cell);
    }
    return matrix;
}

function toggleMatrixB() {
    let operation = document.getElementById("operation").value;
    let matrixB = document.getElementById("matrixB");

    if (["transposeA", "determinantA", "identityA"].includes(operation)) {
        matrixB.style.display = "none";
    } else {
        matrixB.style.display = "flex";
    }
}

function getMatrixValues(matrix) {
    return Array.from(matrix).map(cell => parseInt(cell.value || 0));
}

function setMatrixValues(matrix, values) {
    values.forEach((val, i) => {
        matrix[i].innerText = val;
    });
}

function calculate() {
    let size = document.getElementById("size").value;
    let operation = document.getElementById("operation").value;
    let matrixA = getMatrixValues(document.querySelector("#matrixA .matrix").querySelectorAll("input"));
    let resultCells = document.querySelector("#result .matrix").querySelectorAll("div");

    let result = Array(size * size).fill(0);

    if (operation === "add" || operation === "subtract" || operation === "multiply") {
        let matrixB = getMatrixValues(document.querySelector("#matrixB .matrix").querySelectorAll("input"));

        if (operation === "add") {
            result = matrixA.map((val, i) => val + matrixB[i]);
        } else if (operation === "subtract") {
            result = matrixA.map((val, i) => val - matrixB[i]);
        } else if (operation === "multiply") {
            result = Array(size * size).fill(0);
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    let sum = 0;
                    for (let k = 0; k < size; k++) {
                        sum += matrixA[i * size + k] * matrixB[k * size + j];
                    }
                    result[i * size + j] = sum;
                }
            }
        }
    } else if (operation === "transposeA") {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                result[j * size + i] = matrixA[i * size + j];
            }
        }
    } else if (operation === "identityA") {
        let isIdentity = matrixA.every((val, i) => (i % (size + 1) === 0 ? val === 1 : val === 0));
        resultCells[0].innerText = isIdentity ? "Yes" : "No";
        return;
    }

    setMatrixValues(resultCells, result);
}
