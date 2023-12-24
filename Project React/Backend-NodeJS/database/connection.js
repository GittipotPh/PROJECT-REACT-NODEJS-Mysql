/*import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mydatabase', 'root', 'your_new_password', {
  host: 'localhost',
  dialect: 'mysql',
  insecureAuth: true,
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the sequelize instance and the testConnection function
export  { sequelize , testConnection }; */
import { Sequelize } from "sequelize";


const sequelizeInstance = new Sequelize('mydatabase', 'root', 'your_new_password', {
  host: 'localhost',
  dialect: 'mysql',
  insecureAuth: true,
});





// Test the connection
async function testConnection() {
  try {
    await sequelizeInstance.authenticate();
    console.log('Connection to MySQL database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


export { sequelizeInstance , testConnection }; 