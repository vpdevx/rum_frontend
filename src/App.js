import React, { useState } from 'react';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import AppBarComponent from './components/AppBarComponent';
import { datadogRum } from '@datadog/browser-rum';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';
import HomePage from './pages/HomePage';

let actionQueue = [];
let lastViewUrl = null;


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
  beforeSend: (event, context) => {
    if (event.type === 'view') {
      // 1. Encontra a ação correspondente usando URL de referência
      const referrer = event.view.referrer;
      const matchingAction = actionQueue.find(a => a.referrer === referrer);
      
      // 2. Vincula a ação à view se for a primeira ocorrência deste URL
      if (event.view.url !== lastViewUrl) {
        event.context.last_action = matchingAction?.name || null;
        console.log(`🌐 View: ${event.view.url} | Ação: ${matchingAction?.name || 'Nenhuma'}`);
        
        // 3. Limpa ações antigas
        actionQueue = actionQueue.filter(a => a.timestamp > Date.now() - 5000);
        lastViewUrl = event.view.url;
      }
      
    } else if (event.type === 'action') {
      // 4. Armazena ação com referência da view atual
      actionQueue.push({
        name: event.action?.target?.name || 'unknown-action',
        referrer: window.location.href,
        timestamp: Date.now()
      });
      console.log(`🔗 Ação: ${event.action?.target?.name} | Referrer: ${window.location.href}`);
    }
    
    return true;
  },
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
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
