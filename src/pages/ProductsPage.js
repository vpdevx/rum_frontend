// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, editProduct } from '../api';
import PopupForm from '../components/ProductForm';
import { Button } from '@mui/material';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '', quantity: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleAddProduct = async () => {
    if (editingProduct) {
      await editProduct({ ...formData, id: editingProduct.id });
      setProducts(products.map((prod) => (prod.id === editingProduct.id ? formData : prod)));
    } else {
      const newProduct = await addProduct(formData);
      setProducts([...products, newProduct]);
    }
    setPopupOpen(false);
    setFormData({ name: '', price: '', description: '', image: '', quantity: '' });
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setPopupOpen(true);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#333' }}>Products</h2>
      <Button variant="contained" color="primary" onClick={() => setPopupOpen(true)} style={{ marginBottom: '20px' }}>
        Add New Product
      </Button>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product, index) => (
          <li key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <img src={product.image} alt={product.name} style={{ width: '100px' }} />
            <Button variant="outlined" onClick={() => handleEditClick(product)} style={{ marginTop: '10px' }}>
              Edit
            </Button>
          </li>
        ))}
      </ul>

      <PopupForm
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ProductsPage;
