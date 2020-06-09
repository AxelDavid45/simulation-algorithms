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
        multiplier = document.querySelector('#multiplier').value,
        constant = document.querySelector('#constant').value,
        moduleValue = document.querySelector('#module').value,
        iterations = document.querySelector('#iterations').value;

    //Verify if the table has childrens
    if (table.childElementCount > 0) {
        removeResult();
    }


    //Verify the seed length is greater than 3
    if (seedNumber !== '' && iterations !== '' && multiplier !== ''
        && constant !== '' && moduleValue !== '') {
        if (seedNumber.length > 0) {
            if (constant % 2 !== 0) {
                //Calculate the multiplier 
                multiplier = 1 + (4 * multiplier);
                //Calculate the module
                moduleValue = 2 ** moduleValue;
                //Start the algorithm
                linearCongruential(seedNumber, multiplier, constant, moduleValue, iterations);
            } else {
                alert('Insert a odd number in the constant');
            }
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

function linearCongruential(seedNumber, multiplier, constant, moduleValue, iterations) {
    //Save the original number used as a sedd
    let seed = parseInt(seedNumber);
    //Variable for saving previous numbers
    let previousNumber = [];
    for (i = 1; i <= iterations; i++) {
        //Initiate variables
        let row;
        let newSeed, randomNumber;

        if (i === 1) {
            //Calculate the first row
            newSeed = (multiplier * parseInt(seedNumber) + parseInt(constant)) % moduleValue;
            randomNumber = newSeed / (moduleValue - 1);

            //Create the row object
            row = {
                iteration: i,
                xSubI: seed,
                pseudo: randomNumber
            }

        } else {
            //Calculate the missing numbers
            newSeed = (multiplier * previousNumber[0] + parseInt(constant)) % moduleValue;
            randomNumber = newSeed / (moduleValue - 1);

            //Create the  row object
            row = {
                iteration: i,
                xSubI: newSeed,
                pseudo: randomNumber
            }

        }

        //Save the previous number generated 
        previousNumber[0] = newSeed;
        
        //Insert the row with data in the table
        renderRows(row);
    }
}


function renderRows(row) {
    // Creates the row with the data
    let html = `
    <tr>
        <th scope="row">${row.iteration}</th>
        <td>${row.xSubI}</td>
        <td>${row.pseudo}</td>
    </tr>
    `;

    //Insert the row in the table
    table.innerHTML += html;
}

