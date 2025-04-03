import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">   
      <h1 className="text-center mb-4">Prediction Data</h1> 
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <h5 className="text-center mb-4">Input Form</h5>
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3" style={{ width: '150px' }}>
            Sepal Length
          </label>
          <input
            type="number"
            className="form-control"
            value={sepalLength}
            onChange={(e) => setSepalLength(e.target.value)}
            placeholder="Enter Sepal Length"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3" style={{ width: '150px' }}>
            Sepal Width
          </label>
          <input
            type="number"
            className="form-control"
            value={sepalWidth}
            onChange={(e) => setSepalWidth(e.target.value)}
            placeholder="Enter Sepal Width"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3" style={{ width: '150px' }}>
            Petal Length
          </label>
          <input
            type="number"
            className="form-control"
            value={petalLength}
            onChange={(e) => setPetalLength(e.target.value)}
            placeholder="Enter Petal Length"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3" style={{ width: '150px' }}>
            Petal Width
          </label>
          <input
            type="number"
            className="form-control"
            value={petalWidth}
            onChange={(e) => setPetalWidth(e.target.value)}
            placeholder="Enter Petal Width"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3" style={{ width: '150px' }}>
            Epochs
          </label>
          <input
            type="number"
            className="form-control"
            value={epochs}
            onChange={(e) => setEpochs(e.target.value)}
            placeholder="Enter Number of Epochs"
          />
        </div>
        <div className="mb-4 d-flex align-items-center">
          <label className="form-label me-3" style={{ width: '150px' }}>
            Learning Rate
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={learningRate}
            onChange={(e) => setLearningRate(e.target.value)}
            placeholder="Enter Learning Rate"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;