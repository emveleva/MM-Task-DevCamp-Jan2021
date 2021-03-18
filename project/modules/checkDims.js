// function that checks the number of dimensions and whether they are correct according to the requirements. It returns text accordingly.
function checkDimensions(dims) {
    let areDimsCorrect = true;
    // checking if the dimensions are exactly 2
    if (dims.length !== 2) {
        console.log('You have entered wrong number of dimensions.'.red);
        console.log('Please try again.'.blue);
        areDimsCorrect = false;
        return;
    }
    const n = Number(dims[0]);
    const m = Number(dims[1]);
    // checking if both dimensions are numbers
    if (isNaN(n) || isNaN(m)) {
        console.log('Dimensions must be numbers.'.red);
        console.log('Please try again.'.blue);
        areDimsCorrect = false;
        return;
    }
    // checking if the dimensions are bigger than 100
    if (n > 100 || m > 100) {
        console.log('Dimensions need to be below 100 each.'.red);
        console.log('Please try again.'.blue);
        areDimsCorrect = false;
        return;
        //checking if the dimensions are smaller than 0
    } else if (n < 0 || m < 0) {
        console.log('Dimensions cannot be negative numbers.'.red);
        console.log('Please try again.'.blue);
        areDimsCorrect = false;
        return;
        // checking if the dimensions are both even numbers
    } else {
        if ((n % 2 !== 0) || (m % 2 !== 0)) {
            console.log('Dimensions must both be even numbers.'.red);
            console.log('Please try again.'.blue);
            areDimsCorrect = false;
            return;
        }
    }
    return areDimsCorrect;
}

module.exports = checkDimensions;