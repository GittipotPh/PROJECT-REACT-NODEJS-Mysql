import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';

const UsersEdit2 = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3004/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrUpdateUser = async () => {
    try {
      const method = userId ? 'patch' : 'post';
      const url = userId ? `http://localhost:3004/users/patch/${userId}` : 'http://localhost:3004/postusers';

      const response = await axios[method](url, formData);

      setUsers((prevUsers) => {
        if (userId) {
          // Update the existing user
          return prevUsers.map((user) => (user.id === userId ? response.data : user));
        } else {
          // Add the newly created user
          return [...prevUsers, response.data];
        }
      });

      // Reset form data and userId after successful operation
      setFormData({
        username: '',
        password: '',
        email: '',
      });
      setUserId('');
    } catch (error) {
      console.error(`Error ${userId ? 'updating' : 'creating'} user:`, error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3004/users/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setUserId('');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/users/${userId}`);
      setUsers([response.data]);
      setUserId('');
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <Container>
      <h1>Users Edit</h1>

      {/* Form for creating or updating a user */}
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateOrUpdateUser}>
          {userId ? 'Update' : 'Create'} User
        </Button>
      </Form>

      {/* Input for user ID */}
      <Form.Group controlId="userId">
        <Form.Label>User ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </Form.Group>

      {/* Buttons for CRUD operations */}
      <Button variant="success" onClick={handleGetUser}>
        Get User
      </Button>{' '}
      <Button variant="warning" onClick={() => setUserId('')}>
        Clear Form
      </Button>{' '}
      <Button variant="danger" onClick={handleDeleteUser}>
        Delete User
      </Button>

      {/* Table to display users */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersEdit2;
