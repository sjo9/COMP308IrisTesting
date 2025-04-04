import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const InputForm = ({ onSubmit }) => {
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [petalWidth, setPetalWidth] = useState('');
  const [epochs, setEpochs] = useState(100);
  const [learningRate, setLearningRate] = useState(0.01);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      sepalLength,
      sepalWidth,
      petalLength,
      petalWidth,
      epochs,
      learningRate,
    });
  };

  return (
    <Container className="py-5 main-container">
      <Card className="main-card">
        <Card.Body className="px-4">
          <Alert variant="info" className="mb-4 custom-alert">
            <h4 className="alert-heading">Input Form</h4>
            <p className="mb-0">Please enter the required data for prediction.</p>
          </Alert>
          <form onSubmit={handleSubmit}>
            <Card className="mb-4 result-card">
              <Card.Body>
                <Table responsive striped bordered hover className="result-table">
                  <tbody>
                    <tr>
                      <th>Sepal Length</th>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={sepalLength}
                          onChange={(e) => setSepalLength(e.target.value)}
                          placeholder="Enter Sepal Length"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Sepal Width</th>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={sepalWidth}
                          onChange={(e) => setSepalWidth(e.target.value)}
                          placeholder="Enter Sepal Width"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Petal Length</th>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={petalLength}
                          onChange={(e) => setPetalLength(e.target.value)}
                          placeholder="Enter Petal Length"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Petal Width</th>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={petalWidth}
                          onChange={(e) => setPetalWidth(e.target.value)}
                          placeholder="Enter Petal Width"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Epochs</th>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={epochs}
                          onChange={(e) => setEpochs(e.target.value)}
                          min="10"
                          max="300"
                          placeholder="10–300 (Ideal)"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Learning Rate</th>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          max="0.1"
                          className="form-control"
                          value={learningRate}
                          onChange={(e) => setLearningRate(e.target.value)}
                          placeholder="0.01–0.1 (Recommended)"
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <div className="text-center mb-2">
              <button
                type="submit"
                className="btn btn-outline-primary custom-ai-button"
                style={{
                  fontWeight: '600',
                  padding: '0.75rem 2.5rem',
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  borderWidth: '2px',
                  boxShadow: '0 4px 8px rgba(0, 78, 152, 0.1)',
                  minWidth: '200px',
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </Card.Body>
      </Card>

      <Alert variant="warning" className="mt-4 custom-alert warning-alert">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '1.5rem', color: '#ffc107' }}></i>
          </div>
          <div>
            <strong>Warning:</strong> For best performance, keep:
            <ul className="mb-0 ps-3">
              <li><strong>Epochs</strong> between <code>10</code> and <code>300</code></li>
              <li><strong>Learning Rate</strong> between <code>0.01</code> and <code>0.1</code></li>
            </ul>
            <small className="text-muted">
              {`Using extreme values (e.g., epochs > 500 or learning rate > 1.0) may slow down or crash your browser.`}
            </small>
          </div>
        </div>
      </Alert>
    </Container>
  );
};

export default InputForm;