import { DataTypes } from 'sequelize';
import { sequelizeInstance } from '../database/connection.js';


const Banner = sequelizeInstance.define('Banner', {
  img_brand_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_promotion_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Correct export statement for ESM
export default Banner;
