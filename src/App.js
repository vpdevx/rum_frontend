import React, { useState } from 'react';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import AppBarComponent from './components/AppBarComponent';
import { datadogRum } from '@datadog/browser-rum';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';
import HomePage from './pages/HomePage';

let pendingAction = null

datadogRum.init({
  applicationId: '7d90867a-51ea-4f3b-9f6f-8eb905571fc8',
  clientToken: 'pub22692abbcf2d8a525f9bc19fd371a906',
  site: 'datadoghq.com',
  allowedTracingUrls: [
      { match: /https:\/\/.*\.lab4ever\.xyz.*/, propagatorTypes: ["tracecontext"]}
  ],
  service: 'rum-teste-frontend',
  env: 'dev',
  
  traceSampleRate: 100,
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  // Specify a version number to identify the deployed version of your application in Datadog
  version: '1.0.0',
  beforeSend: (event) => {
    if (event.type === 'view') {
      // Anexa a ação pendente à nova view
      event.context.triggering_action = pendingAction;
      pendingAction = null; // Limpa após usar
    } else if (event.type === 'action') {
      // Armazena a ação para a próxima view
      pendingAction = event.action.target.name
    }
    return true;
  },
});

const App = () => {
  const navigate = useNavigate();

  const handleChangePage = (page) => {
    if (page === 'home') {
      navigate(`/`);
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <div>
      <AppBarComponent onClickMenuButton={handleChangePage} pages={['home','customers', 'products']} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
