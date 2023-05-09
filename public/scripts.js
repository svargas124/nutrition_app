function validateForm() {
    const goal = document.getElementById("goal");
    const diet = document.getElementById("diet");
    const workout = document.getElementById("workout");
    let isValid = true;
  
    // Clear existing error messages
    clearErrorMessages();
  
    // Add validation logic for each input field (e.g., check if empty, valid options selected, etc.)
  
    // Validate the workout input field
    if (workout.value.trim() === "") {
      showError(workout, "Workout routine cannot be empty.");
      isValid = false;
    }
  
    // Return true if all validations pass, and false otherwise
    return isValid;
  }
  
  function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
  
    errorMessages.forEach(function (errorMessage) {
      errorMessage.remove();
    });
  }
  
  function showError(inputElement, message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    inputElement.parentElement.appendChild(errorMessage);
  }
  
  // Add event listener for form submission
  document.getElementById("nutrition-form").addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    if (validateForm()) {
      // Call the function to submit the form using AJAX
      submitForm();
    } else {
      // Display an error message to the user
      console.error("Please correct the errors in the form before submitting.");
    }
  });
  
  async function fetchRecommendations(goal, diet, workout) {
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal, diet, workout })
    });
  
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
  
    const recommendations = await response.json();
    return recommendations;
  }
  
  function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = '';
  
    recommendations.forEach(recommendation => {
      const listItem = document.createElement('li');
      listItem.textContent = `${recommendation.name} (${recommendation.macronutrients})`;
      recommendationsContainer.appendChild(listItem);
    });
  }
  
  async function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get the input values from the form
    const goal = document.getElementById('goal').value;
    const diet = document.getElementById('diet').value;
    const workout = document.getElementById('workout').value;
  
    try {
      // Call the function to fetch recommendations from the backend
      const recommendations = await fetchRecommendations(goal, diet, workout);
  
      // Display the recommendations on the page
      displayRecommendations(recommendations);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching recommendations. Please try again later.');
    }
  }
  
  // Add an event listener to the form to handle the form submission
  const form = document.getElementById('nutrition-form');
  form.addEventListener('submit', handleFormSubmit);
    