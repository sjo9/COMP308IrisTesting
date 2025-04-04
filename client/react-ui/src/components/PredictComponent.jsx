import React, { useState } from 'react';
import axios from 'axios';
import { Spinner, Form, Button, Alert, Table, Card, Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';

function PredictComponent({ isModelTrained, trainingInfo }) {
  const [formData, setFormData] = useState({
    sepalLength: 5.1,
    sepalWidth: 3.5,
    petalLength: 1.4,
    petalWidth: 0.2
  });
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [showReference, setShowReference] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isModelTrained) {
      setError('Please train the model first (Step 1) before making predictions.');
      return;
    }
    setIsPredicting(true);
    setError(null);
    try {
      const response = await axios.post('/api/predict', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      setError(error.response?.data?.error || 'An error occurred during prediction');
    } finally {
      setIsPredicting(false);
    }
  };

  const getSpeciesColor = (species) => {
    switch (species) {
      case 'setosa': return '#4CAF50'; // Green
      case 'virginica': return '#2196F3'; // Blue
      case 'versicolor': return '#FF9800'; // Orange
      default: return '#9E9E9E'; // Grey
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Step 2: Predict Iris Species</h2>
      {!isModelTrained && (
        <Alert variant="warning" className="text-center">
          <strong>⚠️ You need to train the model in Step 1 before making predictions.</strong>
        </Alert>
      )}
      <Card className="p-4 mb-4">
        <Form onSubmit={handleSubmit}>
          <h3 className="mb-4">Flower Measurements</h3>
          <div className="row">
            {['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'].map((field, index) => (
              <div className="col-md-6 mb-3" key={field}>
                <Form.Group controlId={field}>
                  <Form.Label>{field.replace(/([A-Z])/g, ' $1')} (cm):</Form.Label>
                  <Form.Control
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    required
                    disabled={!isModelTrained}
                  />
                </Form.Group>
              </div>
            ))}
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            className="w-100" 
            disabled={!isModelTrained || isPredicting}
          >
            {isPredicting ? 'Predicting...' : 'Predict Species'}
          </Button>
        </Form>
      </Card>
      {isPredicting && (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" role="status" />
          <span className="ms-3">Making prediction...</span>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-3 text-center">
          <strong>❌ {error}</strong>
        </Alert>
      )}
      {prediction && (
        <Card className="mt-4">
          <Card.Body>
            <h3 className="text-center">Prediction Result</h3>
            <div 
              className="text-center mt-3"
              style={{ backgroundColor: getSpeciesColor(prediction.species), padding: '15px', borderRadius: '5px', color: 'white' }}
            >
              <h4>{prediction.species.toUpperCase()} 🌸</h4>
            </div>
            <h5 className="mt-4">Probabilities:</h5>
            <div className="list-group">
              {['setosa', 'virginica', 'versicolor'].map((species, index) => (
                <OverlayTrigger
                  key={species}
                  placement="top"
                  overlay={<Tooltip>{(prediction.probabilities[index] * 100).toFixed(2)}%</Tooltip>}
                >
                  <div className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{species.charAt(0).toUpperCase() + species.slice(1)}</span>
                      <div className="d-flex align-items-center">
                        <div 
                          className="progress"
                          style={{ width: '100px', height: '10px' }}
                        >
                          <div
                            className="progress-bar"
                            style={{
                              width: `${(prediction.probabilities[index] * 100).toFixed(2)}%`,
                              backgroundColor: getSpeciesColor(species),
                            }}
                          />
                        </div>
                        <span className="ms-2">{(prediction.probabilities[index] * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
      <div className="mt-4">
        <Button
          variant="link"
          onClick={() => setShowReference(!showReference)}
          aria-controls="reference-table"
          aria-expanded={showReference}
        >
          {showReference ? 'Hide Reference Values' : 'Show Reference Values'}
        </Button>
        <Collapse in={showReference}>
          <div id="reference-table">
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Species</th>
                  <th>Sepal Length</th>
                  <th>Sepal Width</th>
                  <th>Petal Length</th>
                  <th>Petal Width</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Setosa</td>
                  <td>4.3-5.8 cm</td>
                  <td>2.3-4.4 cm</td>
                  <td>1.0-1.9 cm</td>
                  <td>0.1-0.6 cm</td>
                </tr>
                <tr>
                  <td>Virginica</td>
                  <td>4.9-7.9 cm</td>
                  <td>2.2-3.8 cm</td>
                  <td>4.5-6.9 cm</td>
                  <td>1.4-2.5 cm</td>
                </tr>
                <tr>
                  <td>Versicolor</td>
                  <td>4.9-7.0 cm</td>
                  <td>2.0-3.4 cm</td>
                  <td>3.0-5.1 cm</td>
                  <td>1.0-1.8 cm</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default PredictComponent;