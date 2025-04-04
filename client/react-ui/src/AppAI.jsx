import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';

function AppAI() {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        console.log('result.data:', result.data);
        setData(result.data);
        setShowLoading(false);
      } catch (error) {
        console.log('error in fetchData:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
        <a href="/customAI" className="btn btn-outline-primary mt-4">Custom AI Model</a>
      {showLoading === false ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          <h1>DEFAULT Prediction Results</h1>

          {/* Table for Test Results */}
          <table className="App-table">
            <thead>
              <tr>
                <th className="App-th">Test 1</th>
                <th className="App-th">Test 2</th>
                <th className="App-th">Test 3</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="App-td">
                  {data[0]}
                </td>
                <td className="App-td">
                  {data[1]}
                </td>
                <td className="App-td">
                  {data[2]}
                </td>
                
              </tr>
            </tbody>
          </table>

          {/* Table for Species Values */}
          <h2>Definition of Values for Species</h2>
          <table className="App-table">
            <thead>
              <tr>
                <th className="App-th">Species</th>
                <th className="App-th">Values</th>
              </tr>
              </thead>

<tbody>
  <tr>
    <td className="App-td">setosa</td>
    <td className="App-td">1, 0, 0</td>
  </tr>
  <tr>
    <td className="App-td">virginica</td>
    <td className="App-td">0, 1, 0</td>
  </tr>
  <tr>
    <td className="App-td">versicolor</td>
    <td className="App-td">0, 0, 1</td>
  </tr>
</tbody>
</table>
</div>
) : (
<div>
{showLoading && (
<Spinner animation="border" role="status">
  <span className="sr-only">Waiting for results...</span>
</Spinner>
)}
</div>
)}
</div>
);
}

export default AppAI;
