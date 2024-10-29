import React, { useState, useEffect } from 'react';
import { fetchCustomers, fetchProducts } from '../api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const HomePage = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const getCounts = async () => {
      const customers = await fetchCustomers();
      setCustomerCount(customers.length);

      const products = await fetchProducts();
      setProductCount(products.length);
    };
    getCounts();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Widget de Contagem de Clientes */}
        <Grid item>
          <Card style={{ width: '300px', textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins, sans-serif', color: '#333' }}>
                Total Customers
              </Typography>
              <Typography variant="h3" style={{ fontWeight: 'bold', color: '#007bff' }}>
                {customerCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Widget de Contagem de Produtos */}
        <Grid item>
          <Card style={{ width: '300px', textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins, sans-serif', color: '#333' }}>
                Total Products
              </Typography>
              <Typography variant="h3" style={{ fontWeight: 'bold', color: '#28a745' }}>
                {productCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;