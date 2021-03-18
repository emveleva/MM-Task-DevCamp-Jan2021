const readline = require('readline');

// helper function since readline is async
const awaitInput = (rl, question) => {
    return new Promise(resolve => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// function that gathers all lines together
function getInput(questions) {
    return new Promise(async resolve => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        let results = [];
        for (let i = 0; i < questions.length; i++) {
            const result = await awaitInput(rl, questions[i]);
            results.push(result);
        }
        rl.close();
        resolve(results);
    })
}

function formatFirstLayer(input){
    const firstLayer = [];
    input.forEach(line => {
        line = line.split(' ');
        line = line.map(x => Number(x))
        firstLayer.push(line);
    });
    return firstLayer;
}

module.exports = {formatFirstLayer, getInput};