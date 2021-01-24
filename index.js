const readline = require('readline');
const colors = require('colors');
const checkDimensions = require('./modules/checkDims');
const inputHelpers = require('./modules/inputHelpers');
const checkFirstLayer = require('./modules/checkInput')
const secondLayerBuild = require('./modules/secondLayer');


// the main function that gathers all else and makes up the app work
const brickworkApp = () => {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // starting the app with getting the dimensions
    return new Promise((resolve, reject) => {
        console.log('--> Welcome to Brickwork <--'.cyan.bold)
        rl.question('Please enter area dimensions: '.yellow, (answer) => {
            rl.close();
            resolve(answer);
        });
        // processing the first input of dimensions and preping them for later use
    }).then(answer => {
        let dims = answer.split(' ');
        if (checkDimensions(dims)) {
            const n = Number(dims[0]);
            const m = Number(dims[1]);
            // variable to gather the first layer input
            let questions = [];
            for (let i = 0; i < n; i++) {
                if (i === 0) {
                    questions.push('Please enter first line and add space between each number: '.blue);
                } else {
                    questions.push('Please enter next line and add space between each number: '.blue);
                }
            }
            inputHelpers.getInput(questions).then(results => {
                // getting the first layer in the needed format in order to create the second one
                const firstLayer = inputHelpers.formatFirstLayer(results);
                if (checkFirstLayer(m, firstLayer)) {
                    // building the second layer only after checking if the first one is correct
                    const secondLayer = secondLayerBuild.secondLayerRaw(n, m, firstLayer);
                    if ((secondLayer.flat()).includes(0)) {
                        // if there is no solution
                        console.log(`-1 \n No solution exists! :(`.red);
                    } else {
                        // if there is a solution, those three lines help to build and print it accordingly
                        secondLayerBuild.horizontalDashes(secondLayer);
                        secondLayerBuild.verticalDashes(secondLayer);
                        secondLayerBuild.finalFormatting(secondLayer);
                    }
                }
            });
        }
    });
}

brickworkApp();