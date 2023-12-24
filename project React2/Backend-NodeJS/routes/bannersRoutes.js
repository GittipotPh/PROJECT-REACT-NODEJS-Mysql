import express from "express";
import * as bannersController from '../controllers/bannersController.js';

const router = express.Router();

router.get('/banners/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const banner = await bannersController.getBannerById(id);

    if (!banner) {
      res.status(404).json({ error: 'Banner not found' });
    } else {
      res.status(200).json(banner);
    }
  } catch (error) {
    console.error('Error fetching banner by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/banners', async (req, res) => {
  try {
    const allBanners = await bannersController.getAllBanners();

    res.status(200).json(allBanners);
  } catch (error) {
    console.error('Error fetching all banners:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/banners/patch/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBanner = await bannersController.updateBannerById(id, req.body);
    res.json(updatedBanner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /banners/:id
router.delete('/banner/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await bannersController.deleteBannerById(id);
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /postbanners
router.post('/postbanners', async (req, res) => {
  try {
    const newBanner = await bannersController.createBanner(req.body);
    res.status(201).json(newBanner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export {router};
