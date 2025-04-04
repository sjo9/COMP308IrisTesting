// models/iris.model.js
class IrisData {
constructor(sepalLength, sepalWidth, petalLength, petalWidth) {
    this.sepalLength = sepalLength;
    this.sepalWidth = sepalWidth;
    this.petalLength = petalLength;
    this.petalWidth = petalWidth;
}

// Convert to the format expected by the TensorFlow model
toTensorFormat() {
    return {
    sepal_length: this.sepalLength,
    sepal_width: this.sepalWidth,
    petal_length: this.petalLength,
    petal_width: this.petalWidth
    };
}

// Validation method
isValid() {
    return (
    !isNaN(this.sepalLength) && 
    !isNaN(this.sepalWidth) && 
    !isNaN(this.petalLength) && 
    !isNaN(this.petalWidth) &&
    this.sepalLength > 0 &&
    this.sepalWidth > 0 &&
    this.petalLength > 0 &&
    this.petalWidth > 0
    );
}
}

// Model parameters class
class ModelParameters {
constructor(epochs = 100, learningRate = 0.06) {
    this.epochs = epochs;
    this.learningRate = learningRate;
}

isValid() {
    return (
    !isNaN(this.epochs) && 
    !isNaN(this.learningRate) &&
    this.epochs > 0 &&
    this.learningRate > 0
    );
}
}

module.exports = {
IrisData,
ModelParameters
};