const { getFoodItems } = require('./database');

function filterFoodItems(foodItems, diet) {
    // Filter the food items based on the user's dietary preferences
    return foodItems.filter(foodItem => {
        switch (diet) {
            case 'Vegan':
                return foodItem.Vegan;
            case 'Vegetarian':
                return foodItem.Vegetarian;
            case 'Gluten Free':
                return foodItem.GlutenFree;
            case 'Keto':
                return foodItem.Keto;
            case 'Paleo':
                return foodItem.Paleo;
            default:
                return true; // if no specific diet is specified, no filtering is done
        }
    });
}

function calculateMacronutrientNeeds(goal) {
    // Here's a placeholder logic to calculate the user's macronutrient needs based on their goal
    let protein, carbohydrates, fats;

    switch (goal) {
        case 'Fat Loss':
            fats <= 40;
            break;
        case 'Muscle Gain':
            protein >= 20;
            break;
        case 'Maintain Composition':
        default:
            protein >= 30;
            fats <= 40;
    }

    return {
        protein,
        fats
    };
}

function rankFoodItems(foodItems, macronutrientNeeds) {
    // Rank the food items based on how well they match the user's macronutrient needs
    return foodItems
        .map(foodItem => ({
            ...foodItem,
            score: Math.abs(foodItem.Protein - macronutrientNeeds.protein)
                  + Math.abs(foodItem.Fat - macronutrientNeeds.fats)
        }))
        .sort((a, b) => a.score - b.score);
}

async function getRecommendations(goal, diet) {
    // Fetch food items from your database
    const foodItems = await getFoodItems();

    // Filter food items based on the user's dietary preferences
    const filteredFoodItems = filterFoodItems(foodItems, diet);

    // Calculate the user's macronutrient needs based on their fitness goal and workout routine
    const macronutrientNeeds = calculateMacronutrientNeeds(goal);

    // Rank the filtered food items based on how well they match the user's macronutrient needs
    const rankedFoodItems = rankFoodItems(filteredFoodItems, macronutrientNeeds);

    // Return the top-ranked food items as recommendations
    return rankedFoodItems.slice(0, 10);
}

module.exports = {
    getRecommendations
};
