// script.js

// Function to toggle category sliders
function toggleCategory(category) {
    const sliders = document.querySelector(`#${category}Category .sliders`);
    sliders.classList.toggle('active');
}

// Update weights of all parent categories
function updateParentWeights(changedCategory) {
    const appearanceWeight = parseInt(document.getElementById('appearanceWeight').value);
    const personalityWeight = parseInt(document.getElementById('personalityWeight').value);

    const totalWeight = appearanceWeight + personalityWeight;

    // Normalize weights so they sum up to 100%
    document.getElementById('appearanceWeight').value = Math.round((appearanceWeight / totalWeight) * 100);
    document.getElementById('personalityWeight').value = Math.round((personalityWeight / totalWeight) * 100);

    updateTotalScore();
}

// Update weights of all subcategories within a parent
function updateSubcategoryWeights(parentCategory, changedSubcategory) {
    const inputs = document.querySelectorAll(`#${parentCategory}Subcategories input[type="number"]`);
    let totalWeight = 0;

    // Sum the weights of the subcategories
    inputs.forEach(input => {
        totalWeight += parseInt(input.value);
    });

    // If the totalWeight is greater than 100%, we need to adjust the values
    if (totalWeight !== 100) {
        const difference = totalWeight - 100;

        inputs.forEach(input => {
            let currentWeight = parseInt(input.value);
            input.value = Math.max(0, currentWeight - Math.floor((currentWeight / totalWeight) * difference)); // avoid negative weights
        });
    }

    updateCategoryScore(parentCategory);
}

// Update the score of a parent category
function updateCategoryScore(category) {
    const subcategories = document.querySelectorAll(`#${category}Subcategories .subcategory`);
    let totalScore = 0;

    subcategories.forEach(sub => {
        const score = parseFloat(sub.querySelector('input[type="range"]').value);
        const weight = parseInt(sub.querySelector('input[type="number"]').value);
        totalScore += score * (weight / 100);
    });

    document.getElementById(`${category}Score`).textContent = totalScore.toFixed(1);
    updateTotalScore();
}

// Update the final total score
function updateTotalScore() {
    const appearanceWeight = parseInt(document.getElementById('appearanceWeight').value) / 100;
    const personalityWeight = parseInt(document.getElementById('personalityWeight').value) / 100;

    const appearanceScore = parseFloat(document.getElementById('appearanceScore').textContent);
    const personalityScore = parseFloat(document.getElementById('personalityScore').textContent);

    const totalScore = (appearanceScore * appearanceWeight) + (personalityScore * personalityWeight);
    document.getElementById('totalScore').textContent = totalScore.toFixed(1);
}

// Add a new subcategory
function addSubcategory(parentCategory) {
    const container = document.getElementById(`${parentCategory}Subcategories`);
    const subId = `sub-${container.childElementCount + 1}`;

    const subcategoryHTML = `
        <div class="subcategory">
            <label>New Subcategory:</label>
            <input type="range" id="${parentCategory}-${subId}" min="1" max="10" value="5" oninput="updateCategoryScore('${parentCategory}')">
            <input type="number" id="${parentCategory}-${subId}-weight" min="0" max="100" value="0" oninput="updateSubcategoryWeights('${parentCategory}', '${parentCategory}-${subId}-weight')">
        </div>
    `;

    container.innerHTML += subcategoryHTML;
}

// Function to adjust weights when increasing or decreasing the subcategory weight
function adjustWeight(category, subCategory, newWeight) {
    const subCategories = document.querySelectorAll(`#${category}Subcategories .subcategory`);
    let totalWeight = 0;
    let weightToDistribute = newWeight;

    // Adjust the weights of subcategories
    subCategories.forEach((sub, index) => {
        const weightInput = sub.querySelector('input[type="number"]');
        let currentWeight = parseInt(weightInput.value);

        // If it's the selected subcategory, set its weight directly
        if (index === subCategory) {
            weightInput.value = newWeight;
        } else {
            // Proportionally adjust the weight of other subcategories
            let adjustedWeight = Math.max(currentWeight - weightToDistribute, 0);
            weightInput.value = adjustedWeight;
        }

        // Recalculate total weight
        totalWeight += parseInt(weightInput.value);
    });

    updateCategoryScore(category);
    updateSubcategoryWeights(category);
}
