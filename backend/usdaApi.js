const axios = require('axios');

async function fetchFoodData(query) {
  const API_KEY = 'vCvYLXGri8Vi9hHdWMNCMp1KT6H3lvT42I5XycRH';
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  fetchFoodData,
};
