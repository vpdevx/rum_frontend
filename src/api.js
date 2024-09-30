// src/API.js
export const fetchCustomers = async () => {
    try {
      const response = await fetch('https://api-rum-teste.k8s.lab4ever.xyz/customer/all');
      if (!response.ok) throw new Error('Failed to fetch customers');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const fetchProducts = async () => {
    try {
      const response = await fetch('https://api-rum-teste.k8s.lab4ever.xyz/product/all');
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const addCustomer = async (customer) => {
    try {
      const response = await fetch('https://api-rum-teste.k8s.lab4ever.xyz/customer/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const addProduct = async (product) => {
    try {
      const response = await fetch('https://api-rum-teste.k8s.lab4ever.xyz/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const editCustomer = async (customer) => {
    try {
      const response = await fetch(`https://api-rum-teste.k8s.lab4ever.xyz/customer/edt`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const editProduct = async (product) => {
    try {
      const response = await fetch(`https://api-rum-teste.k8s.lab4ever.xyz/product/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  export const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`https://api-rum-teste.k8s.lab4ever.xyz/customer/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return await response;
    } catch (error) {
      console.error(error);
    }
  };

  export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://api-rum-teste.k8s.lab4ever.xyz/product/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return await response;
    } catch (error) {
      console.error(error);
    }
  };