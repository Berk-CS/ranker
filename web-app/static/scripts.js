// Get all necessary elements from the DOM
const appearanceScoreSlider = document.getElementById('appearance-score');
const appearanceWeightSlider = document.getElementById('appearance-weight');
const appearanceScoreValue = document.getElementById('appearance-score-value');
const appearanceWeightValue = document.getElementById('appearance-weight-value');

const personalityScoreSlider = document.getElementById('personality-score');
const personalityWeightSlider = document.getElementById('personality-weight');
const personalityScoreValue = document.getElementById('personality-score-value');
const personalityWeightValue = document.getElementById('personality-weight-value');

const finalScoreDisplay = document.getElementById('final-score');

const addSubcategoryButton = document.getElementById('add-subcategory');
const subcategoryTemplate = document.getElementById('subcategory-template');
const subcategoriesContainer = document.querySelector('.subcategories');

// Initialize scores and weights
let subcategories = [];

// Function to update the appearance score and weight
function updateCategoryScores() {
    // Appearance
    const appearanceScore = parseInt(appearanceScoreSlider.value);
    const appearanceWeight = parseInt(appearanceWeightSlider.value);
    appearanceScoreValue.textContent = appearanceScore;
    appearanceWeightValue.textContent = appearanceWeight;

    // Personality
    const personalityScore = parseInt(personalityScoreSlider.value);
    const personalityWeight = parseInt(personalityWeightSlider.value);
    personalityScoreValue.textContent = personalityScore;
    personalityWeightValue.textContent = personalityWeight;

    // Calculate and update the final score
    calculateFinalScore();
}

// Function to calculate the final score based on subcategories and parent scores
function calculateFinalScore() {
    let totalScore = 0;
    let totalWeight = 0;

    // Add parent categories' weighted contribution to the final score
    const appearanceScore = parseInt(appearanceScoreSlider.value);
    const appearanceWeight = parseInt(appearanceWeightSlider.value);
    totalScore += (appearanceScore * appearanceWeight) / 100;
    totalWeight += appearanceWeight;

    const personalityScore = parseInt(personalityScoreSlider.value);
    const personalityWeight = parseInt(personalityWeightSlider.value);
    totalScore += (personalityScore * personalityWeight) / 100;
    totalWeight += personalityWeight;

    // Add subcategory contributions to the final score
    subcategories.forEach(subcategory => {
        const subcategoryScore = parseInt(subcategory.scoreSlider.value);
        const subcategoryWeight = parseInt(subcategory.weightSlider.value);
        totalScore += (subcategoryScore * subcategoryWeight) / 100;
        totalWeight += subcategoryWeight;
    });

    // Normalize the final score if totalWeight is not 100 (to handle cases where weights don't add up to 100)
    if (totalWeight !== 100) {
        totalScore = (totalScore / totalWeight) * 100;
    }

    // Display the final score
    finalScoreDisplay.textContent = `Total Score: ${Math.round(totalScore)}`;
}

// Function to create and add a new subcategory
function addSubcategory() {
    const newSubcategory = subcategoryTemplate.cloneNode(true);
    newSubcategory.style.display = 'block';

    const subcategoryNameInput = newSubcategory.querySelector('.subcategory-name');
    const subcategoryScoreSlider = newSubcategory.querySelector('.subcategory-score');
    const subcategoryScoreValue = newSubcategory.querySelector('.subcategory-score-value');
    const subcategoryWeightSlider = newSubcategory.querySelector('.subcategory-weight');
    const subcategoryWeightValue = newSubcategory.querySelector('.subcategory-weight-value');

    // Initialize subcategory defaults
    subcategoryScoreValue.textContent = subcategoryScoreSlider.value;
    subcategoryWeightValue.textContent = subcategoryWeightSlider.value;

    // Add event listeners for the subcategory sliders
    subcategoryScoreSlider.addEventListener('input', () => {
        subcategoryScoreValue.textContent = subcategoryScoreSlider.value;
        updateCategoryScores();
    });

    subcategoryWeightSlider.addEventListener('input', () => {
        subcategoryWeightValue.textContent = subcategoryWeightSlider.value;
        updateCategoryScores();
    });

    // Store subcategory references
    subcategories.push({
        nameInput: subcategoryNameInput,
        scoreSlider: subcategoryScoreSlider,
        weightSlider: subcategoryWeightSlider,
    });

    // Append new subcategory to the container
    subcategoriesContainer.appendChild(newSubcategory);

    // Update final score after adding the subcategory
    updateCategoryScores();
}

// Event listeners for category sliders
appearanceScoreSlider.addEventListener('input', updateCategoryScores);
appearanceWeightSlider.addEventListener('input', updateCategoryScores);
personalityScoreSlider.addEventListener('input', updateCategoryScores);
personalityWeightSlider.addEventListener('input', updateCategoryScores);

// Event listener for adding a new subcategory
addSubcategoryButton.addEventListener('click', addSubcategory);

// Initialize scores and weights on page load
updateCategoryScores();
