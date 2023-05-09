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
    event.preventDefault();

    if (validateForm()) {
        // Call the function to submit the form using AJAX
        submitForm();
    } else {
        // Display an error message to the user
        console.error("Please correct the errors in the form before submitting.");
    }
});

document.getElementById("nutrition-form").addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the user input from the form
    const goal = document.getElementById("goal").value;
    const diet = document.getElementById("diet").value;
    const workout = document.getElementById("workout").value;

    // Perform client-side validation (if not already done)

    // Send the AJAX request to the server
    fetch("/api/recommendations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal, diet, workout }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("An error occurred while processing the request.");
            }
            return response.json();
        })
        .then((recommendations) => {
            // Display the recommendations on the frontend
            const recommendationsDiv = document.getElementById("recommendations");
            recommendationsDiv.innerHTML = ""; // Clear the previous recommendations, if any

            recommendations.forEach((recommendation) => {
                const p = document.createElement("p");
                p.textContent = `${recommendation.foodName} - ${recommendation.calories} calories, ${recommendation.protein}g protein, ${recommendation.carbs}g carbs, ${recommendation.fat}g fat`;
                recommendationsDiv.appendChild(p);
            });
        })
        .catch((error) => {
            console.error(error);
            alert("An error occurred while processing your request. Please try again.");
        });
});
