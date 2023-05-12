const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('./backend/database');
const { getRecommendations } = require('./backend/recommendation');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.body.goal, req.body.diet);
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
