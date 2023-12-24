const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const axios = require('axios');
const cors = require('cors'); // Add this line

const app = express();
const port = 3004; 

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your React app's URL
    credentials: true,
  }));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.use(bodyParser.json());




const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'your_new_password',
database: 'mydatabase',
insecureAuth: true,
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');});


app.post('/userlogin', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {

        const user = results[0];

        if (password === user.password) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    }
  });
});



app.post('/userregister', (req, res) => {
  const { username, password, email } = req.body;

  const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  connection.query(sql, [username, password, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User registered successfully!');
      res.status(200).send('User registered successfully!');
    }
  });
});

app.patch('/users/patch/:id', (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
  
    // Replace the following query with the actual UPDATE query for updating a user by ID
    const query = 'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?';
    connection.query(query, [username, password, email, id], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows > 0) {
          res.json({ message: 'User updated successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      }
    });
  });
  



app.get('/users/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      }
    });
  });
  
  // Continue with other routes
  

app.delete('/users/delete/:id', (req, res) => {
  const { id } = req.params;

  // Replace the following query with the actual DELETE query for deleting a user by ID
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  });
});


app.get('/', (req, res) => {
    res.send('Hello, this is the root page!');});
  

app.patch('/shops/patch/:id', (req, res) => {
  const shopId = req.params.id;
  const updatedShopData = req.body;

  // Replace the following query with the actual UPDATE query for updating a shop
  const query = 'UPDATE shops SET ? WHERE id = ?';
  connection.query(query, [updatedShopData, shopId], (err, result) => {
    if (err) {
      console.error('Error updating shop:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Shop updated successfully' });
    }
  });
});


app.delete('/shops/delete/:id', (req, res) => {
    const shopId = req.params.id;
  
    // Replace the following query with the actual DELETE query for deleting a shop
    const query = 'DELETE FROM shops WHERE id = ?';
    connection.query(query, [shopId], (err, result) => {
      if (err) {
        console.error('Error deleting shop:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Shop deleted successfully' });
      }
    });
  });
  

app.get('/shops', (req, res) => {
    // Perform a SELECT query to retrieve shop data from the database
    const query = 'SELECT * FROM shops';

    connection.query(query, (err, results) => {
        if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        // Send the retrieved shop data as JSON
        res.json(results);
        }
    });});

app.get('/shops/:id', (req, res) => {
  const { id } = req.params;

  // Replace the following query with the actual SELECT query for retrieving a shop by ID
  const query = 'SELECT * FROM shops WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Shop not found' });
      }
    }
  });
});



app.get('/banners/:id', (req, res) => {
  const { id } = req.params;

  // Replace the following query with the actual SELECT query for retrieving a banner by ID
  const query = 'SELECT * FROM banners WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Banner not found' });
      }
    }
  });
});


app.get('/banners', (req, res) => {
    
const query = 'SELECT * FROM banners';

connection.query(query, (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        
        res.json(results);}});});    



app.post('/postbanners', (req, res) => {
  const { img_brand_url, img_promotion_url, content, topic } = req.body;

  // Replace the following query with the actual INSERT query for creating a new banner
  const query = 'INSERT INTO banners (img_brand_url, img_promotion_url, content, topic) VALUES (?, ?, ?, ?)';
  connection.query(query, [img_brand_url, img_promotion_url, content, topic], (err, result) => {
    if (err) {
      console.error('Error creating banner:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newBannerId = result.insertId;
      res.status(201).json({ id: newBannerId, message: 'Banner created successfully' });
    }
  });
});



app.patch('/banners/patch/:id', (req, res) => {
    const bannerId = req.params.id;
    const { img_brand_url, img_promotion_url, content, topic } = req.body;
  
    // Replace the following query with the actual UPDATE query for updating a banner
    const query = 'UPDATE banners SET img_brand_url = ?, img_promotion_url = ?, content = ?, topic = ? WHERE id = ?';
    connection.query(query, [img_brand_url, img_promotion_url, content, topic, bannerId], (err, result) => {
      if (err) {
        console.error('Error updating banner:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Banner updated successfully' });
      }
    });
  });

  

app.delete('/banners/delete/:id', (req, res) => {
  const bannerId = req.params.id;

  // Replace the following query with the actual DELETE query for deleting a banner
  const query = 'DELETE FROM banners WHERE id = ?';
  connection.query(query, [bannerId], (err, result) => {
    if (err) {
      console.error('Error deleting banner:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Banner deleted successfully' });
    }
  });
});








app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});