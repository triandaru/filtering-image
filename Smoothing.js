

function Smoothing(colorImage) {

    ImageFiltering.call(this, colorImage);
}

Smoothing.prototype = new ImageFiltering();


Smoothing.prototype.createAveragingFilter = function (size_f) {
    var size = size_f * size_f;
    var filter = new Array(size);

    for (var i = 0; i < size; i++) {
        filter[i] = 1.0 / size;
    }

    return filter;
}


Smoothing.prototype.createGaussianFilter = function (size_f, sigma) {
    var init = Math.floor(size_f / 2);
    var k = 1.0 / Math.sqrt(2.0 * Math.PI) / sigma;

    var t = new Array(size_f);
    var total = 0.0;
    for (var i = 0; i < size_f; i++) {
        var x = i - init;
        t[i] = k / Math.exp(x * x / (2 * sigma * sigma));
        total += t[i];
    }

    for (var j = 0; j < size_f; j++) t[j] /= total;

    var filter = new Array(size_f * size_f);
    for (var n = 0; n < size_f; n++) {
        for (var m = 0; m < size_f; m++) {
            filter[n * size_f + m] = t[n] * t[m];
        }
    }

    return filter;
}


Smoothing.prototype.medianFilltering = function (size_f) {
    var init = Math.floor(size_f / 2);
    var from = - init;
    var to = init;

    var result = this.src;

    var filterR = new Array(size_f * size_f);
    var filterG = new Array(size_f * size_f);
    var filterB = new Array(size_f * size_f);

    for (var y = init; y < this.src.height - init; y++) {
        for (var x = init; x < this.src.width - init; x++) {


            for (var n = from; n <= to; n++) {
                for (var m = from; m <= to; m++) {
                    var pixel = this.src.getPixel(x + m, y + n);
                    filterR[(n + init) * size_f + m + init] = pixel.R;
                    filterG[(n + init) * size_f + m + init] = pixel.G;
                    filterB[(n + init) * size_f + m + init] = pixel.B;
                }
            }


            filterR.sort();
            filterG.sort();
            filterB.sort();

            var R = filterR[Math.floor((size_f * size_f) / 2)];
            var G = filterG[Math.floor((size_f * size_f) / 2)];
            var B = filterB[Math.floor((size_f * size_f) / 2)];

            result.setPixel(x, y, R, G, B);

        }
    }

    return result;
}

