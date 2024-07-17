

function ImageFiltering(image) {
    this.src = image;
}


ImageFiltering.prototype.spatialFiltering = function (filter, size_f) {

    switch (this.src.channels) {
        case 1:
            return spatialFiltering_Gray(this.src);
            break;

        case 3:
            return spatialFiltering_Color(this.src);
            break;

        case 4:
            return spatialFiltering_Color(this.src);
            break;

        default:
            return spatialFiltering_Color(this.src);
            break;
    }


    function spatialFiltering_Gray(src) {
        var init = Math.floor(size_f / 2);
        var from = - init;
        var to = init;

        var result = src.copy();

        var sum, absSum;
        var total;
        var n, m;

        for (var y = 0; y < src.height; y++) {
            for (var x = 0; x < src.width; x++) {
                sum = 0;
                total = 0;


                if (x - init < 0 || x + init >= src.width
                    || y - init < 0 || y + init >= src.height) { // yes


                    for (n = from; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            if (x + m < 0 || x + m >= src.width
                                || y + n < 0 || y + n >= src.height) {
                                continue;
                            }

                            total += filter[(n + init) * size_f + m + init];
                            sum += src.getPixel(x + m, y + n) * filter[(n + init) * size_f + m + init];

                        }
                    }

                    if (total > 0) sum /= total;

                } else { // no

                    for (n = from; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            sum += src.getPixel(x + m, y + n) * filter[(n + init) * size_f + m + init];
                        }
                    }

                }

                absSum = Math.floor(Math.abs(sum));
                if (absSum > 255) absSum = 255;
                result.setPixel(x, y, absSum);
            }
        }

        return result;

    }


    function spatialFiltering_Color(src) {
        var init = Math.floor(size_f / 2);
        var from = - init;
        var to = init;

        var result = src.copy();


        var sumR, sumG, sumB;
        var absSumR, absSumG, absSumB;

        var total;
        var n, m;
        var pixel;

        for (var y = 0; y < src.height; y++) {
            for (var x = 0; x < src.width; x++) {
                sumR = sumG = sumB = 0.0;
                total = 0.0;


                if (x - init < 0 || x + init >= src.width
                    || y - init < 0 || y + init >= src.height) { // yes


                    for (n = from; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            if (x + m < 0 || x + m >= src.width
                                || y + n < 0 || y + n >= src.height) {
                                continue;
                            }

                            total += filter[(n + init) * size_f + m + init];

                            pixel = src.getPixel(x + m, y + n);
                            sumR += pixel.R * filter[(n + init) * size_f + m + init];
                            sumG += pixel.G * filter[(n + init) * size_f + m + init];
                            sumB += pixel.B * filter[(n + init) * size_f + m + init];
                        }
                    }


                    if (total > 0) sumR /= total;
                    if (total > 0) sumG /= total;
                    if (total > 0) sumB /= total;

                } else { // no

                    for (n = from; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            pixel = src.getPixel(x + m, y + n);
                            sumR += pixel.R * filter[(n + init) * size_f + m + init];
                            sumG += pixel.G * filter[(n + init) * size_f + m + init];
                            sumB += pixel.B * filter[(n + init) * size_f + m + init];

                        }
                    }

                }

                absSumR = Math.floor(Math.abs(sumR));
                absSumG = Math.floor(Math.abs(sumG));
                absSumB = Math.floor(Math.abs(sumB));

                if (absSumR > 255) absSumR = 255;
                if (absSumG > 255) absSumG = 255;
                if (absSumB > 255) absSumB = 255;

                result.setPixel(x, y, absSumR, absSumG, absSumB);

            }
        }

        return result;
    }

}

