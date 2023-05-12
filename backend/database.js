const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'nutrition_2'
  });

  return connection;
}

async function getFoodItems() {
  const connection = await connect();

  const query = 'SELECT * FROM FoodItems';

  const [rows] = await connection.execute(query);

  await connection.end();

  return rows;
}

async function createUser(userData) {
  const connection = await connect();

  const query = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
  const values = [userData.username, userData.email, userData.password];

  await connection.execute(query, values);

  await connection.end();
}

async function getUserById(userId) {
  const connection = await connect();

  const query = 'SELECT * FROM Users WHERE ID = ?';
  const [rows] = await connection.execute(query, [userId]);

  await connection.end();

  return rows[0];
}

async function updateUser(userId, updatedUserData) {
  const connection = await connect();

  const query = 'UPDATE Users SET username = ?, email = ?, password = ? WHERE ID = ?';
  const values = [updatedUserData.username, updatedUserData.email, updatedUserData.password, userId];

  await connection.execute(query, values);

  await connection.end();
}

async function deleteUser(userId) {
  const connection = await connect();

  const query = 'DELETE FROM Users WHERE ID = ?';

  await connection.execute(query, [userId]);

  await connection.end();
}

module.exports = {
  getFoodItems,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
