/*import express from 'express';
import * as usersController from '../controllers/usersController.js';

const router = express.Router();

POST: Register a new user
router.post('/userregister', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await usersController.registerUser(username, password, email);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Get all users (for admin)
router.get('/getuserbyadmin', async (req, res) => {
  try {
    const allUsers = await usersController.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST: User login
router.post('/userlogin', async (req, res) => {
  const { username, password } = req.body;
  console.log("username reach here controller");
  try {
    const findUserMatch = await usersController.loginUser(username, password);
    res.status(200).json(findUserMatch);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersController.getUserByIdOrUsername(id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /users/patch/:id
router.patch('/users/patch/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await usersController.updateUserById(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /users/delete/:id
router.delete('/users/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await usersController.deleteUserById(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export {router}; */


// In routes/usersRoutes.js

import express from 'express';
import * as usersController from '../controllers/usersController.js';

const router = express.Router();

// Handle both GET and POST requests for /userlogin
router.route('/userlogin')
  .get((req, res) => {
    // Handle GET request if needed
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
      const findUserMatch = await usersController.loginUser(username, password);
      res.status(200).json(findUserMatch);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/userregister', async (req, res) => {
    
    const { username, password, email } = req.body;
    
    console.log('root reach register');

    try {
      const newUser = await usersController.registerUser(username, password, email);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export { router };
