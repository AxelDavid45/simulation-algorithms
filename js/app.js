let form = document.querySelector('#inputForm')
table = document.querySelector('.tableNumbers');

// When the page loads, start the program
document.addEventListener('DOMContentLoaded', eventListeners);

//Listeners
function eventListeners() {
    form.addEventListener('submit', verifyInputs)
}

function verifyInputs(e) {
    e.preventDefault();
    let seedNumber = document.querySelector('#seedNumber').value,
        iterations = document.querySelector('#iterations').value;

    if (seedNumber !== '' && iterations !== '') {
        if (seedNumber.length > 3) {
            startAlgorithm(seedNumber, iterations);
        } else {

        }
    }
}

function startAlgorithm(seedNumber, iterations) {
    squareNumber = seedNumber ** 2;
    for (i = 0; i <= iterations; i++) {
        numberAsString = squareNumber.toString();
        if (squareNumber.length % 2 === 0) {
            middleNumbers = numberAsString.substr(numberAsString.length - 2, numberAsString.length - 1);
        } else {
            numberAsString = '0' + numberAsString;
            halfOfTheNumber = Math.round(numberAsString.length / 2);
            middleNumbers = numberAsString.substr(halfOfTheNumber - 2, halfOfTheNumber - 1);
        }

        let row = {
            iteration: i,
            randomNumber: middleNumbers,
            squaredNumber: squareNumber,
            pseudo:     middleNumbers
        };

        renderRows(row);
        squareNumber = middleNumbers ** 2;
    }
    
    //Make a par number
    

}

function renderRows(row) {
    let html = `
    <tr>
        <th scope="row">${row.iteration}</th>
        <td>${row.randomNumber}</td>
        <td>${row.squaredNumber}</td>
        <td>${row.pseudo}</td>
    </tr>
    `;

    //Insert the row in the table
    table.innerHTML = html;
}

