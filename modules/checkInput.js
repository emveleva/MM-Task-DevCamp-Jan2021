// function that verifies the first layer
function checkFirstLayer(m, firstLayer) {
    // checks line length
    let firstLayerIsOk = true;
    for (let i = 0; i < firstLayer.leigth; i++) {
        if (firstLayer[i].length !== m) {
            firstLayerIsOk = false;
            console.log('Line length is not correct.'.red);
            console.log('Please try again.'.blue);
            return;
        }
    }

    // checks if input includes NaN
    for (let i = 0; i < firstLayer.length; i++) {
        if (firstLayer[i].includes(NaN)) {
            firstLayerIsOk = false;
            console.log('The input should consist only of numbers.'.red);
            console.log('Please try again.'.blue);
            return;
        }
    }

    // check if brick is found more than two times
    let testingLayer = firstLayer.flat();
    for (let i = 0; i < testingLayer.length; i++) {
        let checkLength = testingLayer.filter(item => item === testingLayer[i]).length;
        if (checkLength > 2) {
            firstLayerIsOk = false;
            console.log('The same brick is used more than once.'.red);
            console.log('Please try again.'.blue);
            return;
        }
    }

    // checks brick length
    for (let i = 0; i < firstLayer.length; i += 2) {
        for (let j = 1; j < firstLayer[i].length - 2; j += 2) {
            if (firstLayer[i][j] !== firstLayer[i][j + 1] &&
                firstLayer[i][j] !== firstLayer[i + 1][j] &&
                firstLayer[i][j] !== firstLayer[i][j - 1] &&
                firstLayer[i + 1][j + 1] !== firstLayer[i + 1][j + 2]) {
                firstLayerIsOk = false;
                console.log('Bricks should be of size 1x2.'.red);
                console.log('Please try again.'.blue);
                return;
            }
        }
    }
    return firstLayerIsOk;
}

module.exports = checkFirstLayer;