import { DataTypes } from 'sequelize';
import { sequelizeInstance } from '../database/connection.js';

const User = sequelizeInstance.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
User.sync();

export default User; // Export the User model
