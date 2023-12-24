import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';

const BannersEdit2 = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    img_brand_url: '',
    img_promotion_url: '',
    content: '',
    topic: '',
  });
  const [bannerId, setBannerId] = useState('');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://localhost:3004/banners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBanner = async () => {
    try {
      const response = await axios.post('http://localhost:3004/postbanners', formData);
      setBanners([...banners, response.data]);
      setFormData({
        img_brand_url: '',
        img_promotion_url: '',
        content: '',
        topic: '',
      });
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  const handleUpdateBanner = async () => {
    try {
      await axios.patch(`http://localhost:3004/banners/patch/${bannerId}`, formData);
      fetchBanners();
      setFormData({
        img_brand_url: '',
        img_promotion_url: '',
        content: '',
        topic: '',
      });
      setBannerId('');
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  const handleDeleteBanner = async () => {
    try {
      await axios.delete(`http://localhost:3004/banners/delete/${bannerId}`);
      fetchBanners();
      setBannerId('');
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const handleGetBanner = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/banners/${bannerId}`);
      setBanners([response.data]);
      setBannerId('');
    } catch (error) {
      console.error('Error fetching banner:', error);
    }
  };

  return (
    <Container>
      <h1>Banners Management</h1>

      {/* Form for creating a new banner */}
      <Form>
        <Form.Group controlId="img_brand_url">
          <Form.Label>Image Brand URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image brand URL"
            name="img_brand_url"
            value={formData.img_brand_url}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="img_promotion_url">
          <Form.Label>Image Promotion URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image promotion URL"
            name="img_promotion_url"
            value={formData.img_promotion_url}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="topic">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateBanner}>
          Create Banner
        </Button>
      </Form>

      {/* Input for banner ID */}
      <Form.Group controlId="bannerId">
        <Form.Label>Banner ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter banner ID"
          value={bannerId}
          onChange={(e) => setBannerId(e.target.value)}
        />
      </Form.Group>

      {/* Buttons for CRUD operations */}
      <Button variant="success" onClick={handleGetBanner}>
        Get Banner
      </Button>{' '}
      <Button variant="warning" onClick={handleUpdateBanner}>
        Update Banner
      </Button>{' '}
      <Button variant="danger" onClick={handleDeleteBanner}>
        Delete Banner
      </Button>

      {/* Table to display banners */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image Brand URL</th>
            <th>Image Promotion URL</th>
            <th>Content</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td>{banner.id}</td>
              <td>{banner.img_brand_url}</td>
              <td>{banner.img_promotion_url}</td>
              <td>{banner.content}</td>
              <td>{banner.topic}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BannersEdit2;
