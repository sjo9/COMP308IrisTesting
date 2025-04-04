import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

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
          <h4>Reference Ranges for Testing</h4>
  <p>You can try these ranges to predict different species:</p>
  <table className="App-table">
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
  </table>
      <InputForm onSubmit={handleSubmit} />

      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p>Processing...</p>
        </div>
      )}

        {result?.probabilities && (
        <div className="mt-4">
            <h4>Prediction Probabilities</h4>
            <Table striped bordered>
            <thead>
                <tr>
                <th>Species</th>
                <th>Probability</th>
                </tr>
            </thead>
            <tbody>
                {["setosa", "virginica", "versicolor"].map((species, i) => (
                <tr key={i}>
                    <td>{species}</td>
                    <td>{(result.probabilities[i] * 100).toFixed(2)}%</td>
                </tr>
                ))}
            </tbody>
            </Table>

          <h4 className="mt-4">Species Encodings</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Species</th>
                <th>Encoding</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Setosa</td><td>1, 0, 0</td></tr>
              <tr><td>Virginica</td><td>0, 1, 0</td></tr>
              <tr><td>Versicolor</td><td>0, 0, 1</td></tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default CustomFormPage;
