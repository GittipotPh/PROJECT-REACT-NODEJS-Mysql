import { DataTypes } from 'sequelize';
import { sequelizeInstance } from '../database/connection.js';

const Shop = sequelizeInstance.define('Shop', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Shop;
