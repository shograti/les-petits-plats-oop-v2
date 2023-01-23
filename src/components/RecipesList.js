class RecipesList {
  constructor(recipes) {
    this.recipes = recipes;
  }
  addRecipe(recipe) {
    this.recipes.push(recipe);
  }

  updateRecipes() {
    this.recipes = recipes;

    this.recipes = filterRecipes();
    this.render();
  }

  createCard(recipe) {
    const recipeItem = document.createElement('div');
    recipeItem.classList.add('recipe-item');
    const card = document.createElement('article');
    const imagePlaceholder = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardHeadRow = document.createElement('div');
    const cardTitle = document.createElement('h2');
    const cardTimeContainer = document.createElement('div');
    const cardTimeText = document.createElement('p');
    const cardTimeIcon = document.createElement('img');
    const cardIngredients = document.createElement('div');
    const cardDescription = document.createElement('p');

    cardTitle.textContent = recipe.name;
    cardTimeIcon.setAttribute('src', 'assets/clock.png');
    cardTimeText.textContent = `${recipe.time} min`;
    cardDescription.textContent = recipe.description;

    recipe.ingredients.forEach((ingredient) => {
      const ingredientContainer = document.createElement('p');
      const ingredientName = document.createElement('span');
      ingredientName.textContent = ingredient.ingredient;
      ingredientContainer.appendChild(ingredientName);
      ingredientContainer.append(
        ` : ${ingredient.quantity ? ingredient.quantity : ''} ${
          ingredient.unit ? ingredient.unit : ''
        }`
      );
      cardIngredients.appendChild(ingredientContainer);
    });

    card.appendChild(imagePlaceholder);
    cardTimeContainer.appendChild(cardTimeText);
    cardTimeContainer.appendChild(cardTimeIcon);
    cardHeadRow.appendChild(cardTitle);
    cardHeadRow.appendChild(cardTimeContainer);
    cardBody.appendChild(cardHeadRow);
    cardBody.appendChild(cardIngredients);
    cardBody.appendChild(cardDescription);
    card.appendChild(cardBody);
    return card;
  }

  firstRender() {
    const recipesList = document.querySelector('.recipes-list');
    removeChildren(recipesList);
    this.recipes.forEach((recipe, index) => {
      if (index < 6) {
        const card = this.createCard(recipe);
        recipesList.appendChild(card);
      }
    });
  }

  render() {
    const recipesList = document.querySelector('.recipes-list');
    removeChildren(recipesList);
    this.recipes.forEach((recipe) => {
      const card = this.createCard(recipe);
      recipesList.appendChild(card);
    });
  }
}