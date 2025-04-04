import React, { useState } from 'react';
import axios from 'axios';
import { Spinner, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

function TrainModelComponent({ onTrainingComplete }) {
  const [modelParams, setModelParams] = useState({
    epochs: 100,
    learningRate: 0.06
  });
  const [isTraining, setIsTraining] = useState(false);
  const [trainingResult, setTrainingResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModelParams({
      ...modelParams,
      [name]: value
    });
  };

  const handleTrainModel = async (e) => {
    e.preventDefault();
    setIsTraining(true);
    setError(null);
    try {
      const response = await axios.post('/api/train', modelParams);
      setTrainingResult(response.data);
      if (onTrainingComplete) {
        onTrainingComplete(response.data);
      }
    } catch (error) {
      console.error('Training error:', error);
      setError(error.response?.data?.error || 'An error occurred during training');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Step 1: Train Neural Network Model</h2>
      <Card className="p-4 mb-4">
        <Form onSubmit={handleTrainModel}>
          <h3 className="mb-4">Model Parameters</h3>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="epochs">
                <Form.Label>Epochs</Form.Label>
                <Form.Control
                  type="number"
                  name="epochs"
                  value={modelParams.epochs}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  placeholder="Enter number of epochs"
                  required
                />
                <Form.Text className="text-muted">Number of training iterations (1-1000)</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="learningRate">
                <Form.Label>Learning Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="learningRate"
                  value={modelParams.learningRate}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  max="1"
                  placeholder="Enter learning rate"
                  required
                />
                <Form.Text className="text-muted">Model learning rate (0.01-1.0)</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={isTraining}
          >
            {isTraining ? 'Training...' : 'Train Model'}
          </Button>
        </Form>
      </Card>
      {isTraining && (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" role="status" />
          <span className="ms-3">Training in progress... This may take a moment.</span>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-3 text-center">
          <strong>❌ {error}</strong>
        </Alert>
      )}
      {trainingResult && (
        <Card className="mt-4">
          <Card.Body>
            <h3 className="text-center">Training Results</h3>
            <div className="mt-3">
              <p><strong>Status:</strong> {trainingResult.message}</p>
              <p><strong>Training Time:</strong> {(trainingResult.trainingTime / 1000).toFixed(2)} seconds</p>
              <p><strong>Final Loss:</strong> {trainingResult.lossValue.toFixed(4)}</p>
              <p><strong>Accuracy:</strong> {(trainingResult.accuracy * 100).toFixed(2)}%</p>
            </div>
          </Card.Body>
          <Card.Footer>
            <p className="text-center">Model trained successfully! Now you can proceed to Step 2 to make predictions.</p>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default TrainModelComponent;