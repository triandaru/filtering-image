

function ImageLoader(canvasId, imageId) {
    this.context = document.getElementById(canvasId).getContext("2d");
    this.image = document.getElementById(imageId);
    this.context.drawImage(this.image, 0, 0);
    this.input = this.context.getImageData(0, 0, this.image.width, this.image.height);
    this.temp = this.context.createImageData(this.image.width, this.image.height);
}


ImageLoader.prototype.loadImage = function (channels) {
    switch (channels) {
        case 1:
            // return loadGrayscale(this.input, this.temp, this.image.width, this.image.height);
            return loadGrayscale(this.context, this.image, this.input, this.temp);
            break;

        case 3:
            // return loadColorImage(this.input, this.temp, this.image.width, this.image.height, channels);
            return loadColorImage(this.context, this.image, this.input, this.temp, channels);
            break;

        case 4:
            // return loadColorImage(this.input, this.temp, this.image.width, this.image.height, channels);
            return loadColorImage(this.context, this.image, this.input, this.temp, channels);
            break;

        default:
            // return loadColorImage(this.input, this.temp, this.image.width, this.image.height, 4);
            return loadColorImage(this.context, this.image, this.input, this.temp, channels);
            break;

    }
}


ImageLoader.prototype.createImage = function (channels) {
    var temp = this.context.createImageData(this.image.width, this.image.height);
    return new IplImage(temp, image.width, this.image.height, channels);
}


ImageLoader.prototype.saveImage = function (iplOutput) {
    this.context.putImageData(iplOutput.imageData, 0, 0);
}


function loadGrayscale(context, image, input, temp) {

    var iplResult = new IplImage(context, image, temp, 1);

    var width = image.width;
    var height = image.height;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var R = input.data[(y * width + x) * 4];
            var G = input.data[(y * width + x) * 4 + 1];
            var B = input.data[(y * width + x) * 4 + 2];
            var A = input.data[(y * width + x) * 4 + 3];

            R = Math.floor(R * 0.299);
            G = Math.floor(G * 0.587);
            B = Math.floor(B * 0.114);

            iplResult.data[(y * width + x) * 4] = R + G + B;
            iplResult.data[(y * width + x) * 4 + 1] = R + G + B;
            iplResult.data[(y * width + x) * 4 + 2] = R + G + B;
            iplResult.data[(y * width + x) * 4 + 3] = A;

        }
    }

    return iplResult;

}


function loadColorImage(context, image, input, temp, channels) {

    var iplResult = new IplImage(context, image, temp, channels);

    var width = image.width;
    var height = image.height;


    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            iplResult.data[(y * width + x) * 4] = input.data[(y * width + x) * 4];
            iplResult.data[(y * width + x) * 4 + 1] = input.data[(y * width + x) * 4 + 1];
            iplResult.data[(y * width + x) * 4 + 2] = input.data[(y * width + x) * 4 + 2];
            iplResult.data[(y * width + x) * 4 + 3] = input.data[(y * width + x) * 4 + 3];
        }
    }

    return iplResult;
}
