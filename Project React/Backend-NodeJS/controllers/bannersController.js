import Banner from '../models/Banner.js';

async function getBannerById(id) {
  try {
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return { error: 'Banner not found' };
    }

    return banner;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching banner by ID');
  }
}

async function getAllBanners() {
  try {
    const allBanners = await Banner.findAll();
    return allBanners;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching all banners');
  }
}

async function updateBannerById(id, data) {
  try {
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return { error: 'Banner not found' };
    }

    await banner.update(data);

    return banner;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating banner');
  }
}

async function deleteBannerById(id) {
  try {
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return { error: 'Banner not found' };
    }

    await banner.destroy();

    return { message: 'Banner deleted successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting banner');
  }
}

async function createBanner(data) {
  try {
    const newBanner = await Banner.create(data);
    return newBanner;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating banner');
  }
}

export { getBannerById, getAllBanners, updateBannerById, deleteBannerById, createBanner };
