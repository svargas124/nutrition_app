const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database'
  });

  return connection;
}

async function getFoodItems() {
  const connection = await connect();

  const query = 'SELECT * FROM food_items';

  const [rows] = await connection.execute(query);

  await connection.end();

  return rows;
}

async function createUser(userData) {
  const connection = await connect();

  const query = 'INSERT INTO users (username, email, password, goal, diet, workout) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [userData.username, userData.email, userData.password, userData.goal, userData.diet, userData.workout];

  await connection.execute(query, values);

  await connection.end();
}

async function getUserById(userId) {
  const connection = await connect();

  const query = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await connection.execute(query, [userId]);

  await connection.end();

  return rows[0];
}

async function updateUser(userId, updatedUserData) {
  const connection = await connect();

  const query = 'UPDATE users SET username = ?, email = ?, password = ?, goal = ?, diet = ?, workout = ? WHERE id = ?';
  const values = [updatedUserData.username, updatedUserData.email, updatedUserData.password, updatedUserData.goal, updatedUserData.diet, updatedUserData.workout, userId];

  await connection.execute(query, values);

  await connection.end();
}

async function deleteUser(userId) {
  const connection = await connect();

  const query = 'DELETE FROM users WHERE id = ?';

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
