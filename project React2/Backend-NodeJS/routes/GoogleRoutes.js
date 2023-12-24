import express from 'express';
import * as googleshopsController from '../controllers/googleshopsController.js';

const router = express.Router();

// GET: Get a Google shop by ID
router.get('/googleshops/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const googleshop = await googleshopsController.getGoogleshopById(id);

    if (!googleshop) {
      res.status(404).json({ error: 'Google shop not found' });
    } else {
      res.status(200).json(googleshop);
    }
  } catch (error) {
    console.error('Error fetching Google shop by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Get all Google shops
router.get('/googleshops', async (req, res) => {
  try {
    const allGoogleshops = await googleshopsController.getAllGoogleshops();

    res.status(200).json(allGoogleshops);
  } catch (error) {
    console.error('Error fetching all Google shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router };
