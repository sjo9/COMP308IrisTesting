import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import { Spinner, Table, Card, Alert } from 'react-bootstrap';
import './App.css';

function CustomFormPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/customAI', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error predicting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-lg main-card">
        <Card.Header className="text-center header-section">
          <h1 className="display-5 fw-bold">Custom AI Prediction</h1>
        </Card.Header>
        <Card.Body className="px-4">
          <Alert variant="info" className="mb-4">
            <h4 className="alert-heading">Reference Ranges for Testing</h4>
            <p className="mb-0">You can try these ranges to predict different species:</p>
          </Alert>

          {/* Table with reference ranges */}
          <Table responsive striped bordered hover className="reference-table">
            <thead className="table-header">
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
                <td>4.3 – 5.8 cm</td>
                <td>2.3 – 4.4 cm</td>
                <td>1.0 – 1.9 cm</td>
                <td>0.1 – 0.6 cm</td>
              </tr>
              <tr>
                <td>Virginica</td>
                <td>4.9 – 7.9 cm</td>
                <td>2.2 – 3.8 cm</td>
                <td>4.5 – 6.9 cm</td>
                <td>1.4 – 2.5 cm</td>
              </tr>
              <tr>
                <td>Versicolor</td>
                <td>4.9 – 7.0 cm</td>
                <td>2.0 – 3.4 cm</td>
                <td>3.0 – 5.1 cm</td>
                <td>1.0 – 1.8 cm</td>
              </tr>
            </tbody>
          </Table>

          {/* Input form for custom prediction */}
          <InputForm onSubmit={handleSubmit} />

          {/* Loading spinner */}
          {loading && (
            <div className="text-center mt-4">
              <Spinner animation="border" />
              <p className="loading-message">Processing...</p>
            </div>
          )}

        {/* Displaying prediction results */}
        {result?.probabilities && (
          <Card className="mt-4">
            <Alert variant="info" className="mb-4">
              <h4 className="alert-heading">Prediction Results</h4>
              <p className="mb-0">The model has analyzed the input data and generated the following predictions.</p>
            </Alert>
            <Card.Body>
              {/* Prediction Probabilities Table */}
              <Card className="mb-4 result-card">
                <Card.Header className="result-header">
                  <h3 className="card-title-custom">Prediction Probabilities</h3>
                </Card.Header>
                <Card.Body>
                  <Table responsive striped bordered hover className="prediction-table">
                    <thead className="table-header">
                      <tr>
                        <th>Species</th>
                        <th>Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Setosa", "Virginica", "Versicolor"].map((species, i) => (
                        <tr key={i}>
                          <td>{species}</td>
                          <td>
                            <strong>{(result.probabilities[i] * 100).toFixed(2)}%</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Species Encodings Table */}
              <Card className="mb-4 result-card">
                <Card.Header className="result-header">
                  <h3 className="card-title-custom">Species Encodings</h3>
                </Card.Header>
                <Card.Body>
                  <Table responsive striped bordered hover className="encoding-table">
                    <thead className="table-header">
                      <tr>
                        <th>Species</th>
                        <th>Encoding</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Setosa</td>
                        <td><code>1, 0, 0</code></td>
                      </tr>
                      <tr>
                        <td>Virginica</td>
                        <td><code>0, 1, 0</code></td>
                      </tr>
                      <tr>
                        <td>Versicolor</td>
                        <td><code>0, 0, 1</code></td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        )}
        </Card.Body>
        <Card.Footer className="text-center text-muted footer-section">
          <p className="mb-0">© 2025 AI Prediction System</p>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default CustomFormPage;
