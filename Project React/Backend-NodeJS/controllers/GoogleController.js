// Import your Shop model or use a database query directly
import Shop from '../models/Shop.js';

// Controller function to get a Google shop by ID
async function getGoogleshopById(id) {
  try {
    // Assuming Shop.findById is a method to find a shop by its ID in your database
    const shop = await Shop.findById(id);

    if (!shop) {
      return null; // Return null if the shop is not found
    }

    // Extract lat and lng from the shop
    const { lat, lng } = shop;

    // Construct the Google shop object
    const googleshop = {
      id: shop.id,
      lat,
      lng,
      // Other properties you may want to include
    };

    return googleshop;
  } catch (error) {
    throw error; // You might want to handle errors more gracefully based on your application needs
  }
}

// Controller function to get all Google shops
async function getAllGoogleshops() {
  try {
    // Assuming Shop.find is a method to find all shops in your database
    const allShops = await Shop.find();

    // Map each shop to a Google shop object
    const allGoogleshops = allShops.map(shop => ({
      id: shop.id,
      lat: shop.lat,
      lng: shop.lng,
      // Other properties you may want to include
    }));

    return allGoogleshops;
  } catch (error) {
    throw error; // You might want to handle errors more gracefully based on your application needs
  }
}

// Exporting the controller functions
export { getGoogleshopById, getAllGoogleshops };
