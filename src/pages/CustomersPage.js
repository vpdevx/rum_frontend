// src/pages/CustomersPage.js
import React, { useState, useEffect } from 'react';
import { fetchCustomers, addCustomer, editCustomer, deleteCustomer } from '../api';
import PopupForm from '../components/CustomerForm';
import { Button } from '@mui/material';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', cpf: '', phone: '', email: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    getCustomers();
  }, []);

  const handleAddCustomer = async () => {
    if (editingCustomer) {
      await editCustomer({ ...formData, id: editingCustomer.id });
      setCustomers(customers.map((cust) => (cust.id === editingCustomer.id ? formData : cust)));
    } else {
      const newCustomer = await addCustomer(formData);
      setCustomers([...customers, newCustomer]);
    }
    setPopupOpen(false);
    setFormData({ name: '', cpf: '', phone: '', email: '' });
    setEditingCustomer(null);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setPopupOpen(true);
  };

  const handleDeleteClick = async (customer) => {
    await deleteCustomer(customer.id);
    setCustomers(customers.filter((cust) => cust.id !== customer.id));
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#333' }}>Customers</h2>
      <Button variant="contained" color="primary" onClick={() => setPopupOpen(true)} style={{ marginBottom: '20px' }}>
        Add New Customer
      </Button>

      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {customers.map((customer, index) => (
            <li key={index} style={{
              border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px 0',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'
            }}>
              <h3>{customer.name}</h3>
              <p><strong>CPF:</strong> {customer.cpf}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <div style={{ marginTop: '10px' }}>
                <Button variant="outlined" onClick={() => handleEditClick(customer)} style={{ marginRight: '8px' }}>
                  Edit
                </Button>
                <Button variant="outlined" onClick={() => handleDeleteClick(customer)} style={{ color: 'red', borderColor: 'red'}}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>


      <PopupForm
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={editingCustomer ? "Edit Customer" : "Add New Customer"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
};

export default CustomersPage;
