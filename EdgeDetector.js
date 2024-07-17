

function EdgeDetector(grayImage) {

    ImageFiltering.call(this, grayImage);
}

EdgeDetector.prototype = new ImageFiltering();


EdgeDetector.prototype.createPrewittFilterH = function () {

    var filter = new Array(
        -1, 0, 1,
        -1, 0, 1,
        -1, 0, 1
    );
    return filter;
}


EdgeDetector.prototype.createPrewittFilterV = function () {
    /* Sobel*/
    var filter = new Array(
        1, 1, 1,
        0, 0, 0,
        -1, -1, -1
    );
    return filter;
}


EdgeDetector.prototype.createSobelFilterH = function () {
    /* Sobel */
    var filter = new Array(
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    );
    return filter;
}


EdgeDetector.prototype.createSobelFilterV = function () {
    /* Sobel */
    var filter = new Array(
        1, 2, 1,
        0, 0, 0,
        -1, -2, -1
    );
    return filter;
}


EdgeDetector.prototype.createLaplacianFilter = function () {
    /* Sobel */
    var filter = new Array(
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    );
    return filter;
}

