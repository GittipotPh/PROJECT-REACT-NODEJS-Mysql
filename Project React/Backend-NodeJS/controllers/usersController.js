import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sequelizeInstance } from '../database/connection.js';

async function registerUser(req, res) {
  const { username, password , email} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/* async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
  
    if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } } */



async function getUserByIdOrUsername(id, username) {
  try {
    let user;

    if (id) {
      // If an ID is provided, try to find the user by ID
      user = await User.findByPk(id);
    } else if (username) {
      // If a username is provided, try to find the user by username
      user = await User.findOne({ where: { username } });
    } else {
      // Handle the case where neither ID nor username is provided
      throw new Error('ID or username must be provided');
    }

    if (!user) {
      // If the user is not found, return an appropriate response
      return { error: 'User not found' };
    }

    // If the user is found, return the user object
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user');
  }
}


async function updateUserById(id, data) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return { error: 'User not found' };
    }

    // Assuming you have a method like updateAttributes to update user data
    await user.updateAttributes(data);

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating user');
  }
}

async function deleteUserById(id) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return { error: 'User not found' };
    }

    await user.destroy();

    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting user');
  }
}


async function loginUser(req, res) {
  const { username, password } = req.body;
  console.log("username reach here controller");

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = `SELECT * FROM users WHERE username = '${username}'`;
    const [user] = await sequelizeInstance.query(query, { type: sequelizeInstance.QueryTypes.SELECT });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // For testing, compare the password directly with a predefined value
    const predefinedPassword = 'testpassword';

    if (password === predefinedPassword) {
      // Continue with your actual logic here
      // For now, it returns a 401 for any non-matching password
      res.status(401).json({ error: 'Invalid password' });
    } else {
      // Handle the case when the password doesn't match the predefined value
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




export { registerUser, loginUser, getUserByIdOrUsername, updateUserById, deleteUserById };