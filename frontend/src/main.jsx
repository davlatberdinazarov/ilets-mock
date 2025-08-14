import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';

import './index.css';
import AdminPage from './pages/AdminPage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import TestPage from './pages/TestPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}> 
          <Route index element={<Navigate to="/test" replace />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);