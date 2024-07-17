

function goAverage() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var smooth = new Smoothing(img);


    var filter = smooth.createAveragingFilter(5);
    var result = smooth.spatialFiltering(filter, 5);


    loader.saveImage(result);
}


function goGaussian() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var smooth = new Smoothing(img);


    var filter = smooth.createGaussianFilter(5, 2.0);
    var result = smooth.spatialFiltering(filter, 5);


    loader.saveImage(result);
}


function goMedian() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var smooth = new Smoothing(img);
    var result = smooth.medianFilltering(3);


    loader.saveImage(result);
}


function goSharpening4() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var sharp = new Sharpening(img);


    var filter = sharp.createSharpeningFilter(4, 0.5);
    var result = sharp.spatialFiltering(filter, 3);


    loader.saveImage(result);
}


function goSharpening8() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var sharp = new Sharpening(img);


    var filter = sharp.createSharpeningFilter(8, 0.5);
    var result = sharp.spatialFiltering(filter, 3);


    loader.saveImage(result);
}


function goPrewitt() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(1);

    var edgeDetector = new EdgeDetector(img);


    var filter = edgeDetector.createPrewittFilterH();
    var result = edgeDetector.spatialFiltering(filter, 3);


    loader.saveImage(result);
}


function goSobel() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(1);

    var edgeDetector = new EdgeDetector(img);


    var filter = edgeDetector.createSobelFilterV();
    var result = edgeDetector.spatialFiltering(filter, 3);


    loader.saveImage(result);
}


function goLaplacian() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(1);

    var edgeDetector = new EdgeDetector(img);


    var filter = edgeDetector.createLaplacianFilter();
    var result = edgeDetector.spatialFiltering(filter, 3);


    loader.saveImage(result);
}

