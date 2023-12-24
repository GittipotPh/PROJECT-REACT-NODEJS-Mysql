import { DataTypes } from 'sequelize';




const Admin = Sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keyadmin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Admin;
