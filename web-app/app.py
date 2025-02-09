from flask import Flask, render_template, request

app = Flask(__name__)

# Initial data for categories
categories = {
    "Appearance": {"score": 50, "weight": 50},
    "Personality": {"score": 50, "weight": 50}
}

# List to store user-defined subcategories
subcategories = []

# Function to calculate the final score based on categories and subcategories
def calculate_final_score():
    total_score = 0
    total_weight = 0

    # Calculate scores for parent categories
    for category, data in categories.items():
        total_score += (data["score"] * data["weight"]) / 100
        total_weight += data["weight"]

    # Calculate scores for subcategories
    for subcategory in subcategories:
        total_score += (subcategory["score"] * subcategory["weight"]) / 100
        total_weight += subcategory["weight"]

    # Normalize the score if total weight doesn't add up to 100
    if total_weight != 100:
        total_score = (total_score / total_weight) * 100

    return round(total_score)

@app.route('/', methods=['GET', 'POST'])
def index():
    global categories, subcategories

    if request.method == 'POST':
        # Update category scores and weights
        for category in categories:
            categories[category]["score"] = int(request.form[f"{category}-score"])
            categories[category]["weight"] = int(request.form[f"{category}-weight"])

        # Update subcategory scores and weights
        for idx, subcategory in enumerate(subcategories):
            subcategory["score"] = int(request.form[f"subcategory-{idx}-score"])
            subcategory["weight"] = int(request.form[f"subcategory-{idx}-weight"])

        # Add a new subcategory if requested
        if request.form.get('add_subcategory'):
            new_subcategory_name = request.form.get('new_subcategory_name')
            subcategories.append({
                "name": new_subcategory_name,
                "score": 50,
                "weight": 50
            })

    final_score = calculate_final_score()
    return render_template('new-index.html', categories=categories, subcategories=subcategories, final_score=final_score)

if __name__ == '__main__':
    app.run(debug=True)
