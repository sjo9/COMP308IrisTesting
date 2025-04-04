import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import './App.css';

function AppAI() {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);
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
        setShowLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCustomAIClick = (e) => {
    e.preventDefault();
    setNavigating(true);
    setTimeout(() => {
      window.location.href = "/customAI";
    }, 1500);
  };

  return (
    <Container className="py-5 main-container">
      {navigating ? (
        <div className="text-center py-5 loading-container">
          <Spinner animation="border" variant="primary" size="lg" />
          <p className="mt-3 loading-message">Preparing Custom AI Model...</p>
        </div>
      ) : (
        <Card className="shadow-lg main-card">
          <Card.Header className="text-center header-section">
            <h1 className="display-5 fw-bold">Custom AI Model</h1>
          </Card.Header>
          <Card.Body className="px-4">
            {showLoading ? (
              <div className="text-center py-5 loading-container">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3 loading-message">Loading results...</p>
              </div>
            ) : (
              <Row>
                <Col lg={12}>
                  <Alert variant="info" className="mb-4">
                    <h4 className="alert-heading">Prediction Results</h4>
                    <p className="mb-0">The model has analyzed the input data and generated the following predictions.</p>
                  </Alert>
                  
                  <div className="text-center mb-4">
                    <a 
                      href="/customAI" 
                      className="btn btn-outline-primary custom-ai-button"
                      onClick={handleCustomAIClick}
                      disabled={navigating}
                    >
                      {navigating ? (
                        <>
                          <Spinner 
                            as="span" 
                            animation="border" 
                            size="sm" 
                            role="status" 
                            aria-hidden="true" 
                            className="me-2" 
                          />
                          Loading Custom AI...
                        </>
                      ) : (
                        'Custom AI Model'
                      )}
                    </a>
                  </div>
                  
                  <Card className="mb-4 result-card">
                    <Card.Header className="result-header">
                      <h3 className="card-title-custom">Test Results</h3>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive striped bordered hover className="result-table">
                        <thead className="table-header">
                          <tr>
                            <th>Test 1</th>
                            <th>Test 2</th>
                            <th>Test 3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{data[0]}</td>
                            <td>{data[1]}</td>
                            <td>{data[2]}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                  
                  <Card className="species-card">
                    <Card.Header className="species-header">
                      <h3 className="card-title-custom">Definition of Values for Species</h3>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive striped bordered hover className="species-table">
                        <thead className="table-header">
                          <tr>
                            <th>Species</th>
                            <th>Values</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>setosa</td>
                            <td>1, 0, 0</td>
                          </tr>
                          <tr>
                            <td>virginica</td>
                            <td>0, 1, 0</td>
                          </tr>
                          <tr>
                            <td>versicolor</td>
                            <td>0, 0, 1</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Card.Body>
          <Card.Footer className="text-center text-muted footer-section">
            <p className="mb-0">© 2025 AI Prediction System</p>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}

export default AppAI;
