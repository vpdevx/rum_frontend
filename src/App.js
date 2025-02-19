import React, { useState } from 'react';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import AppBarComponent from './components/AppBarComponent';
import { datadogRum } from '@datadog/browser-rum';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';
import HomePage from './pages/HomePage';

let actionQueue = [];
let lastProcessedViewUrl = null;



datadogRum.init({
    applicationId: 'a2a8318e-717e-45fb-a712-3f6f92a576dc',
    clientToken: 'pub1e46cd88bbe3bc20165ec60dd9ebf208',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'us5.datadoghq.com',
  allowedTracingUrls: [
      { match: /https:\/\/.*\.lab4ever\.xyz.*/, propagatorTypes: ["tracecontext"]}
  ],
  service: 'rum-teste',
  env: 'dev',
  
  traceSampleRate: 100,
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  // Specify a version number to identify the deployed version of your application in Datadog
  version: '1.0.0',
  beforeSend: (event) => {
    if (event.type === 'view') {
      const currentViewUrl = event.view.url;
      
      // Só processa se for uma nova view
      if (currentViewUrl !== lastProcessedViewUrl) {
        const nextAction = actionQueue.shift(); // Pega a ação mais antiga
        
        // Vincula a ação apenas se houver correspondência temporal
        if (nextAction && nextAction.timestamp < event.date) {
          event.context.last_action = nextAction.name;
          console.log(`✅ View: ${currentViewUrl} | Ação Vinculada: ${nextAction.name}`);
        } else {
          console.log(`🔄 View: ${currentViewUrl} | Sem ações pendentes`);
        }
        
        lastProcessedViewUrl = currentViewUrl;
      }
      console.log(event)
    } else if (event.type === 'action') {
      // Armazena ações com timestamp
      actionQueue.push({
        name: event.action?.target?.name || 'unknown-action',
        timestamp: event.date // Usa o timestamp do evento RUM
      });
      console.log(`🎯 Ação Registrada: ${event.action?.target?.name}`);
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
