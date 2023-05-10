function validateForm() {
    const goal = document.getElementById("goal");
    const diet = document.getElementById("diet");
    let isValid = true;
  
    // Clear existing error messages
    clearErrorMessages();
  
    // Add validation logic for each input field (e.g., check if empty, valid options selected, etc.)
  
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

document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateForm()) {
        fetch('/api/recommendations', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            goal: document.getElementById('goal').value,
            diet: document.getElementById('diet').value,
            // workout: document.getElementById('workout').value
            })
        })
        .then(response => response.json())
        .then(data => {
            // Here we update the DOM with the received recommendation
            const recContainer = document.getElementById('recommendations-container');
            recContainer.innerHTML = '';
            const foodItem = document.createElement('li');
            foodItem.textContent = `We recommend: ${data.name}. Nutritional Value - Calories: ${data.nutritionalValue.calories}, Protein: ${data.nutritionalValue.protein}, Carbs: ${data.nutritionalValue.carbs}, Fats: ${data.nutritionalValue.fats}`;
            recContainer.appendChild(foodItem);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        // Display an error message to the user
        console.error("Please correct the errors in the form before submitting.");
    }
});
