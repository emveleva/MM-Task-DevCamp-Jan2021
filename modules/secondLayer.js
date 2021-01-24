// main building function that combines all needed ones to make up the final secnd layer to be printed
function secondLayerRaw(n, m, firstLayer) {
    // empty array to be filled in accordance to the first layer
    const secondLayer = new Array(n).fill(0).map(() => new Array(m).fill(0));

    for (let i = 0; i < n; i += 2) {
        for (let j = 0; j < m; j++) {
            if (secondLayer[i][j] !== 0) {
                continue;
            }
            if (firstLayer[i][j + 2] == undefined) {
                dimsEqual2(i, j, firstLayer, secondLayer);
            } else {
                fillBricks(i, j, firstLayer, secondLayer);
            }
        }
    }
    return secondLayer;
}

// function that prepares the final output for print - joins all arrays in one, removing the commas and addint top and bottom lines with dashes
function finalFormatting(secondLayer) {
    // empty array that is going to be the final one to be printed
    let secondLayerPrint = [];
    // saving the length of each line so it can then be added as dashes at the top and bottom
    let length = 0;
    // loop that fills the empty array that will be printed and removes the commas
    for (let i = 0; i < secondLayer.length; i++) {
        length = secondLayer[i].toString().length;
        secondLayerPrint.push('| ' + (secondLayer[i].join(' ')) + ' |')
    }
    // adding the first and last arrays - top and bottom of the print
    secondLayerPrint.unshift('┍ ' + '—'.repeat(length) + ' ┑');
    secondLayerPrint.push('┕ ' + '—'.repeat(length) + ' ┙')
    console.log(secondLayerPrint.join('\n').cyan.bold);
}

// function that fills arrays in between lines - one with empty space where there is a brick and one that is all filled
function verticalDashes(secondLayer) {
    for (let i = 0; i < secondLayer.length - 1; i += 2) {
        secondLayer.splice(i + 1, 0, []);
        for (let j = 0; j < secondLayer[i].length; j++) {
            if ((secondLayer[i][j] === secondLayer[i + 2][j] &&
                    secondLayer[i][j] !== '—' &&
                    secondLayer[i][j] !== ' ')) {
                secondLayer[i + 1].push(' '.repeat(secondLayer[i][j].toString().length));
            } else {
                secondLayer[i + 1].push('—'.repeat(secondLayer[i][j].toString().length));
            }
        }
    }
    return secondLayer;
}

// function that adds the dashes between two bricks on the same line
function horizontalDashes(secondLayer) {
    for (let i = 0; i < secondLayer.length; i++) {
        for (let j = 1; j < secondLayer[i].length; j++) {
            if (secondLayer[i][j] !== secondLayer[i][j - 1]) {
                secondLayer[i].splice(j, 0, '—');
                j++
            } else {
                secondLayer[i].splice(j, 0, ' ');
                j++
            }
        }
    }
    return secondLayer;
}

// function that checks the length of each digit and adds space accordingly
function checkNumber(number) {
    if (number === undefined) {
        number = 0;
    }
    if (number.toString().length === 1) {
        number = '  ' + number + ' ';
    } else if (number.toString().length === 2) {
        number = ' ' + number + ' ';
    } else if (number.toString().length === 3) {
        number = ' ' + number;
    }
    return number;
}

// function that takes care of the bricks building if the dimensions are 2x2 or if after m % 4 we have 2 bricks left
function dimsEqual2(i, j, firstLayer, secondLayer) {
    if (firstLayer[i][j] === firstLayer[i][j + 1]) {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i + 1][j]);
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i + 1][j]);
    } else {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i][j + 1]);
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i][j + 1]);
    }
    return secondLayer;
}

// function that builds all other bricks besides the last two if the dimensions are not 2x2 and after m % 4 we have 2 bricks left.
// the ifs are all possible versions of the bricks' layout and how to rearrange the second layer accordingly
function fillBricks(i, j, firstLayer, secondLayer) {
    if (firstLayer[i][j] === firstLayer[i + 1][j] &&
        firstLayer[i][j + 1] === firstLayer[i + 1][j + 1] &&
        firstLayer[i][j + 2] === firstLayer[i + 1][j + 2] &&
        firstLayer[i][j + 3] === firstLayer[i + 1][j + 3]) {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i][j + 1])
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i][j + 1]);
        secondLayer[i][j + 2] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i][j + 3] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i + 1][j + 2] = checkNumber(firstLayer[i][j + 3]);
        secondLayer[i + 1][j + 3] = checkNumber(firstLayer[i][j + 3]);
    } else if (firstLayer[i][j] === firstLayer[i + 1][j] &&
        firstLayer[i][j + 1] !== firstLayer[i + 1][j + 1] &&
        firstLayer[i][j + 2] !== firstLayer[i + 1][j + 2] &&
        firstLayer[i][j + 3] === firstLayer[i + 1][j + 3]) {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i + 1][j + 1]);
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i + 1][j + 1]);
        secondLayer[i][j + 2] = checkNumber(firstLayer[i][j + 1]);
        secondLayer[i][j + 3] = checkNumber(firstLayer[i][j + 1]);
        secondLayer[i + 1][j + 2] = checkNumber(firstLayer[i + 1][j + 3]);
        secondLayer[i + 1][j + 3] = checkNumber(firstLayer[i + 1][j + 3]);
    } else if (firstLayer[i][j] !== firstLayer[i + 1][j] &&
        firstLayer[i][j + 1] !== firstLayer[i + 1][j + 1] &&
        firstLayer[i][j + 2] === firstLayer[i + 1][j + 2] &&
        firstLayer[i][j + 3] === firstLayer[i + 1][j + 3]) {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i + 1][j]);
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i + 1][j]);
        secondLayer[i][j + 2] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i][j + 3] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i + 1][j + 2] = checkNumber(firstLayer[i][j + 3]);
        secondLayer[i + 1][j + 3] = checkNumber(firstLayer[i][j + 3]);
    } else if (firstLayer[i][j] === firstLayer[i + 1][j] &&
        firstLayer[i][j + 1] === firstLayer[i + 1][j + 1] &&
        firstLayer[i][j + 2] !== firstLayer[i + 1][j + 2] &&
        firstLayer[i][j + 3] !== firstLayer[i + 1][j + 3]) {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i][j + 1]);
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i][j + 1]);
        secondLayer[i][j + 2] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i + 1][j + 2] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i][j + 3] = checkNumber(firstLayer[i + 1][j + 2]);
        secondLayer[i + 1][j + 3] = checkNumber(firstLayer[i + 1][j + 2]);
    } else if (firstLayer[i][j] !== firstLayer[i + 1][j] &&
        firstLayer[i][j + 1] !== firstLayer[i + 1][j + 1] &&
        firstLayer[i][j + 2] !== firstLayer[i + 1][j + 2] &&
        firstLayer[i][j + 3] !== firstLayer[i + 1][j + 3]) {
        secondLayer[i][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i + 1][j] = checkNumber(firstLayer[i][j]);
        secondLayer[i][j + 1] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i][j + 2] = checkNumber(firstLayer[i][j + 2]);
        secondLayer[i + 1][j + 1] = checkNumber(firstLayer[i + 1][j + 1]);
        secondLayer[i + 1][j + 2] = checkNumber(firstLayer[i + 1][j + 1]);
        secondLayer[i][j + 3] = checkNumber(firstLayer[i + 1][j + 3]);
        secondLayer[i + 1][j + 3] = checkNumber(firstLayer[i + 1][j + 3]);
    }
    return secondLayer;
}

module.exports = {
    secondLayerRaw,
    horizontalDashes,
    verticalDashes,
    finalFormatting
};