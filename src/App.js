import React, { useState } from 'react';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import AppBarComponent from './components/AppBarComponent';
import { datadogRum } from '@datadog/browser-rum';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';
import HomePage from './pages/HomePage';

let actionQueue = [];


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
  // beforeSend: (event) => {
  //   if (event.type === 'view') {
  //     // Usa o ID único da view ao invés da URL
  //     if (event.view.id !== lastViewId) {
  //       const relevantAction = actionQueue.find(a => a.timestamp < event.date);
        
  //       if (relevantAction) {
  //         event.context.custom_last_action = relevantAction.name

          
  //         // Remove ações processadas (mais antigas que esta view)
  //         actionQueue = actionQueue.filter(a => a.timestamp >= event.date);
  //       }

  //       lastViewId = event.view.id;
  //       console.log(`🌐 View ID: ${event.view.id} | Ação: ${relevantAction?.name || 'Nenhuma'}`);
  //     }
      
  //     // Força a preservação do contexto
  //     event._dd = event._dd || {};
  //     event._dd.manual_override = true;

  //   } else if (event.type === 'action') {
  //     actionQueue.push({
  //       name: event.action?.target?.name || 'unknown-action',
  //       timestamp: event.date
  //     });
  //     console.log(`🎯 Ação Registrada: ${event.action?.target?.name} @ ${event.date}`);
  //   }
    
  //   return true;
  // },
beforeSend: (event, context) => {
  console.log(`Event type: ${event.type}, Date: ${event.date}, Current last_action: ${window.last_action}, Last action date: ${window.last_action_date || 'none'}`);

  if (event.type === 'action' && event.action?.target?.name) {
    // Store the last action and its timestamp
    window.last_action = event.action.target.name;
    window.last_action_date = event.date; // Store the action's timestamp
    console.log(`Action detected - Set last_action to: ${window.last_action}, Timestamp: ${window.last_action_date}`);
  } else if (event.type === 'view') {
    // Attach last_action only if it exists and the view's date is after the action's date
    if (window.last_action && window.last_action_date && event.date > window.last_action_date) {
      event.context = event.context || {};
      event.context.last_action = window.last_action;
      console.log(`View detected - Attached last_action: ${window.last_action} (Action date: ${window.last_action_date} < View date: ${event.date})`);
      // Optionally clear after attaching
      window.last_action = null;
      window.last_action_date = null;
      console.log('Cleared last_action and last_action_date after attaching');
    } else {
      console.log(`View detected - Skipped attaching last_action (Action date: ${window.last_action_date || 'none'} >= View date: ${event.date || 'none'})`);
    }
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
