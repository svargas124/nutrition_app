const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/recommendations', (req, res) => {
    // Extract data from the request body
    const { goal, diet, workout } = req.body;

    // Validate the incoming data (you may reuse the validation functions from the frontend)
    // ...

    // Call a function to query the database and get the nutrition recommendations
    getNutritionRecommendations(goal, diet, workout)
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});