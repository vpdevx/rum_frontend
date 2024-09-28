import React, { useState } from 'react';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import AppBarComponent from './components/AppBarComponent';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '5b8e2f7e-ee27-4c31-a627-df0d3634f911',
  clientToken: 'pub9970e541911a397e72d8b9dc4ce3c097',
  site: 'datadoghq.com',
  allowedTracingUrls: [/https:\/\/.*\.k8s\.lab4ever\.xyz.*/],
  service: 'rum-teste-frontend',
  env: 'dev',
  
  traceSampleRate: 100,
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  // Specify a version number to identify the deployed version of your application in Datadog
  version: '1.0.0',
  beforeSend: (event, context) => {
    // collect a RUM resource's response headers
    if (event.type === 'resource' && event.resource.type === 'fetch') {
      event.context.responseHeaders = Object.fromEntries(context.response.headers)
    }
    return true
  },
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});

const App = () => {
  const [activePage, setActivePage] = useState('customers');

  const handleChangePage = (page) => {
    setActivePage(page);
  };

  return (
    <div>
      <AppBarComponent onClickMenuButton={handleChangePage} pages={['customers', 'products']} />
      {activePage === 'customers' && <CustomersPage />}
      {activePage === 'products' && <ProductsPage />}
    </div>
  );
};

export default App;

