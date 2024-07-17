function Sharpening(colorImage) {

    ImageFiltering.call(this, colorImage);
}

Sharpening.prototype = new ImageFiltering();


Sharpening.prototype.createSharpeningFilter = function (neighborhood, k) {
    var filter = new Array(9);

    switch (neighborhood) {
        case 4:
            filter[0] = 0; filter[1] = -k; filter[2] = 0;
            filter[3] = -k; filter[4] = 1 + 4 * k; filter[5] = -k;
            filter[6] = 0; filter[7] = -k; filter[8] = 0;
            break;

        case 8:
            filter[0] = -k; filter[1] = -k; filter[2] = -k;
            filter[3] = -k; filter[4] = 1 + 8 * k; filter[5] = -k;
            filter[6] = -k; filter[7] = -k; filter[8] = -k;
            break;

        default:
            filter[0] = -k; filter[1] = -k; filter[2] = -k;
            filter[3] = -k; filter[4] = 1 + 8 * k; filter[5] = -k;
            filter[6] = -k; filter[7] = -k; filter[8] = -k;
            break;
    }

    return filter;
}

