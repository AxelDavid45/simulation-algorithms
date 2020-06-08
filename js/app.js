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
    //Obtains the data
    let seedNumber = document.querySelector('#seedNumber').value,
        iterations = document.querySelector('#iterations').value;

    //Verify the seed length is greater than 3
    if (seedNumber !== '' && iterations !== '') {
        if (seedNumber.length > 3) {
            //Start the algorithm
            startAlgorithm(seedNumber, iterations);
        } else {

        }
    }
}

function startAlgorithm(seedNumber, iterations) {
    //Save the original number used as a sedd
    let seed = seedNumber;

    for (i = 1; i <= iterations; i++) {
        //Initiate variables
        let row;
        let squaredNumber = seedNumber ** 2;
        let numberAsString = squaredNumber.toString();

        //Verify the length of the seed
        if (squaredNumber.length % 2 === 0) {
            seedNumber = numberAsString.substr(numberAsString.length - 2, numberAsString.length - 1);
        } else {
            //Add a zero if the length of the number is odd 
            numberAsString = '0' + numberAsString;
            halfOfTheNumber = Math.round(numberAsString.length / 2);
            //Obtains the numbers in the middle
            seedNumber = numberAsString.substr(halfOfTheNumber - 2, halfOfTheNumber - 1);
        }

        //Create the object row depending on the iteration number
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
        
        //Insert the row with data in the table
        renderRows(row);
    }
}
    

function renderRows(row) {
    // Creates the row with the data
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

