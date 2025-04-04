// controllers/prediction.controller.js
const tf = require('@tensorflow/tfjs');
const { IrisData, ModelParameters } = require('../models/iris.model');

// Load iris training data
const iris = require('../../iris.json');

// Store the trained model in memory so we don't have to retrain for each prediction
let trainedModel = null;
let isModelTrained = false;
let lastTrainingInfo = {
  epochs: 0,
  learningRate: 0,
  accuracy: 0,
  lossValue: 0,
  trainingTime: 0
};

// Train the model with specified parameters
exports.trainModel = async function(req, res) {
  try {
    const params = req.body;
    const modelParams = new ModelParameters(
      parseInt(params.epochs) || 100,
      parseFloat(params.learningRate) || 0.06
    );
    
    if (!modelParams.isValid()) {
      return res.status(400).json({ 
        error: 'Invalid model parameters. Epochs must be a positive integer and learning rate must be a positive number.'
      });
    }
    
    console.log(`Training model with epochs=${modelParams.epochs}, learningRate=${modelParams.learningRate}`);
    
    const startTime = Date.now();
    
    // Train the model
    const result = await trainModel(iris, modelParams);
    trainedModel = result.model;
    isModelTrained = true;
    
    // Store training information
    lastTrainingInfo = {
      epochs: modelParams.epochs,
      learningRate: modelParams.learningRate,
      accuracy: result.accuracy,
      lossValue: result.lossValue,
      trainingTime: Date.now() - startTime
    };
    
    res.status(200).json({
      message: 'Model trained successfully',
      trainingTime: lastTrainingInfo.trainingTime,
      accuracy: lastTrainingInfo.accuracy,
      lossValue: lastTrainingInfo.lossValue
    });
  } catch (error) {
    console.error('Error in trainModel:', error);
    res.status(500).json({ error: 'An error occurred during model training' });
  }
};

// Predict using the trained model
exports.predictIrisSpecies = async function(req, res) {
  try {
    // Check if model is trained
    if (!isModelTrained || !trainedModel) {
      return res.status(400).json({ 
        error: 'Model not trained. Please train the model first.'
      });
    }
    
    // Create IrisData from request body
    const irisData = new IrisData(
      parseFloat(req.body.sepalLength),
      parseFloat(req.body.sepalWidth),
      parseFloat(req.body.petalLength),
      parseFloat(req.body.petalWidth)
    );
    
    // Validate input data
    if (!irisData.isValid()) {
      return res.status(400).json({ 
        error: 'Invalid flower measurements. All values must be positive numbers.'
      });
    }
    
    // Create a tensor from the user input
    const inputTensor = tf.tensor2d([[
      irisData.sepalLength, 
      irisData.sepalWidth, 
      irisData.petalLength, 
      irisData.petalWidth
    ]]);
    
    // Make prediction
    const prediction = trainedModel.predict(inputTensor);
    const probabilities = await prediction.array();
    
    // Get the highest probability class
    const highestProbIndex = probabilities[0].indexOf(Math.max(...probabilities[0]));
    let species;
    switch(highestProbIndex) {
      case 0:
        species = 'setosa';
        break;
      case 1:
        species = 'virginica';
        break;
      case 2:
        species = 'versicolor';
        break;
      default:
        species = 'unknown';
    }
    
    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();
    
    res.status(200).json({
      species: species,
      probabilities: probabilities[0],
      modelInfo: lastTrainingInfo
    });
    
  } catch (error) {
    console.error('Error in predictIrisSpecies:', error);
    res.status(500).json({ error: 'An error occurred during prediction' });
  }
};

// Get training status and info
exports.getModelStatus = function(req, res) {
  res.status(200).json({
    trained: isModelTrained,
    trainingInfo: lastTrainingInfo
  });
};

// Helper function to train the model
async function trainModel(trainingDataset, modelParams) {
  // tensor of features for training data
  const trainingData = tf.tensor2d(trainingDataset.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
  ]));
  
  // tensor of output for training data
  const outputData = tf.tensor2d(trainingDataset.map(item => [
    item.species === "setosa" ? 1 : 0,
    item.species === "virginica" ? 1 : 0,
    item.species === "versicolor" ? 1 : 0
  ]));
  
  // build neural network using a sequential model
  const model = tf.sequential();
  
  // Add the first layer with relu activation
  model.add(tf.layers.dense({
    inputShape: [4],
    units: 8,
    activation: 'relu',
  }));
  
  // Add another dense layer
  model.add(tf.layers.dense({
    units: 10,
    activation: 'relu',
  }));
  
  // Add the output layer with softmax activation
  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax',
  }));
  
  // Compile the model
  model.compile({
    optimizer: tf.train.adam(modelParams.learningRate),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  
  let finalLoss = 0;
  let finalAccuracy = 0;
  
  // Train the model
  const result = await model.fit(trainingData, outputData, {
    epochs: modelParams.epochs,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        finalLoss = logs.loss;
        finalAccuracy = logs.acc;
        if (epoch % 10 === 0) {
          console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
        }
      }
    }
  });
  
  // Clean up tensors
  trainingData.dispose();
  outputData.dispose();
  
  return {
    model,
    lossValue: finalLoss,
    accuracy: finalAccuracy
  };
}