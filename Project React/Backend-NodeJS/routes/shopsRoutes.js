// shopsRoutes.js

import express from 'express';
import * as shopsController from '../controllers/shopsContoller.js';

const router = express.Router();

// GET: Get a shop by ID
router.get('/shops/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const shop = await shopsController.getShopById(id);

    if (!shop) {
      res.status(404).json({ error: 'Shop not found' });
    } else {
      res.status(200).json(shop);
    }
  } catch (error) {
    console.error('Error fetching shop by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Get all shops
router.get('/shops', async (req, res) => {
  try {
    const allShops = await shopsController.getAllShops();

    res.status(200).json(allShops);
  } catch (error) {
    console.error('Error fetching all shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH: Update a shop by ID
router.patch('/shops/patch/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShop = await shopsController.updateShopById(id, req.body);
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE: Delete a shop by ID
router.delete('/shops/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await shopsController.deleteShopById(id);
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router };
