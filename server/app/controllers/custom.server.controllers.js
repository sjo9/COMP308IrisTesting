const tf = require('@tensorflow/tfjs');
const iris = require('../../iris.json');
const irisTesting = require('../../iris-testing.json');
const { IrisData, ModelParameters } = require('../models/iris.model'); 
let lossValue;

exports.trainAndPredict = function (req, res) {
    console.log(irisTesting);

    const { sepalLength, sepalWidth, petalLength, petalWidth, epochs, learningRate } = req.body;

    const input = new IrisData(
        sepalLength || 5.1,
        sepalWidth || 3.5,
        petalLength || 1.4,
        petalWidth || 0.2
    );
    const params = new ModelParameters(epochs || 100, learningRate || 0.06);

    if (!input.isValid() || !params.isValid()) {
        return res.status(400).json({ error: 'Invalid input values. Please enter positive numbers.' });
    }

    // Convert/setup our data for TensorFlow.js
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
    ]));

    //
    // tensor of output for training data
    // the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]));

    // Use user input for prediction
    const testingData = tf.tensor2d([[
        input.sepalLength, input.sepalWidth, input.petalLength, input.petalWidth
    ]]);

    // Build neural network using a sequential model
    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [4],
        units: 8,
        activation: 'relu'
    }));

    model.add(tf.layers.dense({
        units: 10,
        activation: 'relu'
    }));

    model.add(tf.layers.dense({
        units: 3,
        activation: 'softmax'
    }));

    // Compile the model
    model.compile({
        optimizer: tf.train.adam(params.learningRate),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    console.log(model.summary());

    // Train the model and predict the results for testing data
    async function run() {
        const startTime = Date.now();

        await model.fit(trainingData, outputData, {
            epochs: params.epochs,
            callbacks: {
                onEpochEnd: async (epoch, log) => {
                    lossValue = log.loss;
                    console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                    console.log('Elapsed time: ' + (Date.now() - startTime));
                }
            }
        });

        const results = model.predict(testingData);
        results.array().then(array => {
            const predictions = array.map(row => {
                const highestProbIndex = row.findIndex(val => val === Math.max(...row));
                return ["setosa", "virginica", "versicolor"][highestProbIndex] || 'Unknown';
            });

            const dataToSend = { predictions: predictions.slice(0, 3) };
            console.log(dataToSend.predictions);

            res.status(200).send(dataToSend.predictions);

            trainingData.dispose();
            outputData.dispose();
            testingData.dispose();
            results.dispose?.(); 
        });
    }

    run();
};
