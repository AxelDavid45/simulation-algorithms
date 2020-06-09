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
 

    //Verify if the table has childrens
    if (table.childElementCount > 0) {
        removeResult();
    }

    //Verify the seed length is greater than 3
    if (seedNumber !== '' && iterations !== '') {
        if (seedNumber.length > 3) {
            //Start the algorithm
            middleSquares(seedNumber, iterations);
        } else {
            alert('Insert a seed number with 4 digits');
        }
    } else {
        alert('Fill the inputs');
    }
}

//Removes the elements in the table before start a new session
function removeResult() {
    let rows = table.children;
    while (table.childElementCount > 0) {
        for (let row of rows) {
            row.remove();
        }
    }
}

function middleSquares(seedNumber, iterations) {
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
                pseudo: seedNumber
            };
        } else {
            row = {
                iteration: i,
                randomNumber: seedNumber,
                squaredNumber: squaredNumber,
                pseudo: seedNumber
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
        <td>0.${row.pseudo}</td>
    </tr>
    `;

    //Insert the row in the table
    table.innerHTML += html;
}

