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
