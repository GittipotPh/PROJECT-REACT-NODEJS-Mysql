// shopsController.js

import Shop from '../models/Shop.js';

// Controller function to get a shop by ID
async function getShopById(id) {
  try {
    const shop = await Shop.findByPk(id);
    return shop;
  } catch (error) {
    throw error;
  }
}

// Controller function to get all shops
async function getAllShops() {
  try {
    const allShops = await Shop.findAll();
    return allShops;
  } catch (error) {
    throw error;
  }
}

// Controller function to update a shop by ID
async function updateShopById(id, data) {
  try {
    const [updatedRows] = await Shop.update(data, { where: { id } });
    if (updatedRows === 0) {
      throw new Error('Shop not found');
    }
    const updatedShop = await Shop.findByPk(id);
    return updatedShop;
  } catch (error) {
    throw error;
  }
}

// Controller function to delete a shop by ID
async function deleteShopById(id) {
  try {
    const deletedRows = await Shop.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new Error('Shop not found');
    }
  } catch (error) {
    throw error;
  }
}

export { getShopById, getAllShops, updateShopById, deleteShopById };
