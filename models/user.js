const connection = require('../DBConnecction')

const createUserTable = () => {
  const query = `
  CREATE TABLE IF NOT EXISTS USERS (
    ID INT AUTO_INCREMENT UNIQUE,
    USERNAME VARCHAR(255) PRIMARY KEY,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD VARCHAR(255)
)`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating users table:', err.stack);
    } else {
      console.log('Users table created or already exists.');
    }
  });
};

module.exports = {
  createUserTable,
};
