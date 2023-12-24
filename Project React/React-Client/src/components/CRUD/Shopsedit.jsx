import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';

const ShopsEdit = () => {
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lat: 0,
    lng: 0,
  });
  const [shopId, setShopId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('get'); // Default to GET

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axios.get('http://localhost:3004/shops');
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrUpdateShop = async () => {
    try {
      const method = selectedMethod === 'patch' ? 'patch' : 'post';
      const url = selectedMethod === 'patch'
        ? `http://localhost:3004/shops/patch/${shopId}`
        : 'http://localhost:3004/shops';

      const response = await axios[method](url, formData);

      setShops((prevShops) => {
        // Update the shops array with the newly created/updated shop
        if (selectedMethod === 'patch') {
          return prevShops.map((shop) => (shop.id === shopId ? response.data : shop));
        } else {
          return [...prevShops, response.data];
        }
      });

      // Reset form data and shopId after successful operation
      setFormData({
        name: '',
        lat: 0,
        lng: 0,
      });
      setShopId('');
    } catch (error) {
      console.error(`Error ${selectedMethod === 'patch' ? 'updating' : 'creating'} shop:`, error);
    }
  };

  const handleDeleteShop = async () => {
    try {
      await axios.delete(`http://localhost:3004/shops/delete/${shopId}`);
      setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));
      setShopId('');
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  const handleGetShop = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/shops/${shopId}`);
      setShops([response.data]);
      setShopId('');
    } catch (error) {
      console.error('Error fetching shop:', error);
    }
  };

  return (
    <Container>
      <h1>Shops Management</h1>

      {/* Form for creating or updating a shop */}
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shop name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="lat">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="number"
            step="0.000001"
            placeholder="Enter latitude"
            name="lat"
            value={formData.lat}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="lng">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="number"
            step="0.000001"
            placeholder="Enter longitude"
            name="lng"
            value={formData.lng}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateOrUpdateShop}>
          {selectedMethod === 'patch' ? 'Update' : 'Create'} Shop
        </Button>
      </Form>

      {/* Input for shop ID */}
      <Form.Group controlId="shopId">
        <Form.Label>Shop ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter shop ID"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
        />
      </Form.Group>

      {/* Buttons for CRUD operations */}
      <Button variant="success" onClick={() => setSelectedMethod('get')}>
        Get Shop
      </Button>{' '}
      <Button variant="warning" onClick={() => setSelectedMethod('patch')}>
        Update Shop
      </Button>{' '}
      <Button variant="danger" onClick={handleDeleteShop}>
        Delete Shop
      </Button>

      {/* Table to display shops */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.id}</td>
              <td>{shop.name}</td>
              <td>{shop.lat}</td>
              <td>{shop.lng}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ShopsEdit;
