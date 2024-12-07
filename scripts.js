// script.js
function updateScore() {
    // Get all input elements
    const traits = document.querySelectorAll('input[type="range"]');
    let totalScore = 0;

    traits.forEach((trait, index) => {
        const score = parseInt(trait.value);
        totalScore += score;

        // Update individual scores
        document.getElementById(`score${index + 1}`).textContent = score;
    });

    // Update total score
    document.getElementById('totalScore').textContent = totalScore;
}
