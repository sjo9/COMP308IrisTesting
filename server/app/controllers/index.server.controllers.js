// server/app/controllers/index.server.controllers.js
const tf = require('@tensorflow/tfjs');

// Load iris training and testing data
const iris = require('../../iris.json');
const irisTesting = require('../../iris-testing.json');

let lossValue;

exports.trainAndPredict = function (req, res) {
    console.log(irisTesting);

    // Convert/setup our data for TensorFlow.js
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
    ]));

    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]));

    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
    ]));

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
        optimizer: tf.train.adam(0.06),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    console.log(model.summary());

    // Train the model and predict the results for testing data
    async function run() {
        const startTime = Date.now();

        await model.fit(trainingData, outputData, {
            epochs: 100,
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
        });
    }

    run();
};