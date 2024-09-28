// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../api';
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

  
  const handleDeleteClick = async (product) => {
    await deleteProduct(product.id);
    setProducts(products.filter((prod) => prod.id !== product.id));
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#333' }}>Products</h2>
      <Button variant="contained" color="primary" onClick={() => setPopupOpen(true)} style={{ marginBottom: '20px' }}>
        Add New Product
      </Button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontFamily: 'Poppins, sans-serif' }}>
        {products.map((product, index) => (
          <div key={index} style={{
            border: '1px solid #ccc', borderRadius: '8px', padding: '16px', width: '250px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'
          }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <Button variant="outlined" onClick={() => handleEditClick(product)} style={{ marginTop: '10px' }}>
              Edit
            </Button>
            <Button variant="outlined" onClick={() => handleDeleteClick(product)} style={{ color: 'red', borderColor: 'red'}}>
                  Delete
            </Button>
          </div>
        ))}
      </div>


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
