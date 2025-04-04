import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Button, Tab, Nav, Alert, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TrainModelComponent from './components/TrainModelComponent';
import PredictComponent from './components/PredictComponent';

function App() {
  const [modelStatus, setModelStatus] = useState({
    trained: false,
    trainingInfo: null
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('train');
  const [trainingError, setTrainingError] = useState(null);

  useEffect(() => {
    const checkModelStatus = async () => {
      try {
        const response = await axios.get('/api/model-status');
        setModelStatus(response.data);
      } catch (error) {
        console.error('Error checking model status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkModelStatus();
  }, []);

  const handleTrainingComplete = (trainingResult) => {
    setTrainingError(null);
    setModelStatus({
      trained: true,
      trainingInfo: {
        epochs: trainingResult.epochs,
        learningRate: trainingResult.learningRate,
        accuracy: trainingResult.accuracy,
        lossValue: trainingResult.lossValue,
        trainingTime: trainingResult.trainingTime
      }
    });
    setActiveTab('predict');
  };

  const handleTrainingFailure = (error) => {
    setTrainingError('An error occurred during training. Please try again.');
    setModelStatus({ trained: false, trainingInfo: null });
  };

  return (
    <div className="app-container">
      <header className="app-header bg-primary text-white py-4 text-center">
        <h1>Iris Species Predictor with Neural Network</h1>
      </header>
      {loading ? (
        <div className="loading-message text-center mt-5">
          <Spinner animation="grow" role="status" variant="primary" />
          <p className="mt-3">Initializing application... Please wait.</p>
        </div>
      ) : (
        <Container className="main-content my-5">
          <Row>
            <Col md={12}>
              <Tab.Container activeKey={activeTab}>
                <Row>
                  <Col sm={3} className="mb-4">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Train the model with your dataset</Tooltip>}
                        >
                          <Nav.Link 
                            eventKey="train" 
                            onClick={() => setActiveTab('train')} 
                            className={activeTab === 'train' ? 'active-tab' : ''}
                          >
                            1. Train Model
                          </Nav.Link>
                        </OverlayTrigger>
                      </Nav.Item>
                      <Nav.Item>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Make predictions using the trained model</Tooltip>}
                        >
                          <Nav.Link 
                            eventKey="predict" 
                            onClick={() => setActiveTab('predict')} 
                            className={activeTab === 'predict' ? 'active-tab' : ''}
                          >
                            2. Make Predictions
                          </Nav.Link>
                        </OverlayTrigger>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9} className="tab-content-container">
                    <Tab.Content>
                      <Tab.Pane eventKey="train">
                        {trainingError && (
                          <Alert variant="danger" className="text-center">
                            {trainingError}
                          </Alert>
                        )}
                        <TrainModelComponent 
                          onTrainingComplete={handleTrainingComplete}
                          onTrainingFailure={handleTrainingFailure} 
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="predict">
                        <PredictComponent
                          isModelTrained={modelStatus.trained}
                          trainingInfo={modelStatus.trainingInfo}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="p-3 mt-4">
                <Card.Body>
                  <h5>Model Status</h5>
                  <div className={`status-value ${modelStatus.trained ? 'trained' : 'untrained'}`}>
                    {modelStatus.trained ? (
                      <Badge bg="success">Trained ✓</Badge>
                    ) : (
                      <Badge bg="danger">Not Trained ✗</Badge>
                    )}
                  </div>
                  {modelStatus.trained && modelStatus.trainingInfo && (
                    <div className="training-parameters mt-2">
                      <small>
                        (Epochs: {modelStatus.trainingInfo.epochs}, Learning Rate: {modelStatus.trainingInfo.learningRate})
                      </small>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;