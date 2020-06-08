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
    let seed = seedNumber;

    for (i = 1; i <= iterations; i++) {
        let row;
        let squaredNumber = seedNumber ** 2;
        let numberAsString = squaredNumber.toString();

        if (squaredNumber.length % 2 === 0) {
            seedNumber = numberAsString.substr(numberAsString.length - 2, numberAsString.length - 1);
        } else {
            numberAsString = '0' + numberAsString;
            halfOfTheNumber = Math.round(numberAsString.length / 2);
            seedNumber = numberAsString.substr(halfOfTheNumber - 2, halfOfTheNumber - 1);
        }


        if (i === 1) {
            row = {
                iteration: i,
                randomNumber: seed,
                squaredNumber: squaredNumber,
                pseudo:     seedNumber
            };
        } else {
            row = {
                iteration: i,
                randomNumber: seedNumber,
                squaredNumber: squaredNumber,
                pseudo:     seedNumber
            };   
        }
        
    
        renderRows(row);
        squaredNumber = seedNumber ** 2;
        console.log(seedNumber, squaredNumber);
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
    table.innerHTML += html;
}

