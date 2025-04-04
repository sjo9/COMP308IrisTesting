//main.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppAI from './AppAI.jsx'
import CustomFormPage from './CustomAI.jsx'; 
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<AppAI />} />
        <Route path="/customAI" element={<CustomFormPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
