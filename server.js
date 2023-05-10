const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getNutritionRecommendations } = require('./backend/database');
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('./backend/database');
const {
  filterFoodItems,
  calculateMacronutrientNeeds,
  rankFoodItems,
  getRecommendations
} = require('./backend/recommendation');
const { fetchFoodData } = require('./backend/usdaApi');  // Import the function

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/test', async (req, res) => {  // Test endpoint
  try {
    const data = await fetchFoodData('chicken');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

app.post('/api/recommendations', (req, res) => {
  // Extract data from the request body
  const { goal, diet, workout } = req.body;

  // Call the getRecommendations function to get the nutrition recommendations
  getRecommendations(goal, diet, workout)
    .then(recommendations => {
      // Send the recommendations back to the client as a JSON object
      res.json(recommendations);
    })
    .catch(error => {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    });
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
