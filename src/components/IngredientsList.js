class IngredientsList {
  constructor() {
    this.ingredients = ingredients;
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
    this.render();
  }

  removeIngredient(ingredient) {
    this.ingredients = this.ingredients.filter((item) => item !== ingredient);
    this.render();
  }

  updateIngredients() {
    this.ingredients = ingredientsList;
    const filteredRecipes = filterRecipes();
    const filteredIngredients = [];
    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        filteredIngredients.push(ingredient.ingredient.toLowerCase());
      });
    });
    tagsList.tags.forEach((tag) => {
      if (tag.type === 'ingredient') {
        filteredIngredients.forEach((ingredient, index) => {
          if (ingredient === tag.name) {
            filteredIngredients.splice(index, 1);
          }
        });
      }
    });
    this.ingredients = filteredIngredients;

    this.render();
  }

  render() {
    const ingredientsList = document.querySelector('.ingredients-list');
    removeChildren(ingredientsList);
    this.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement('p');
      ingredientItem.classList.add('ingredient-item');
      ingredientItem.addEventListener('click', () => {
        tagsList.addTag({ type: 'ingredient', name: ingredient });
        recipesList.updateRecipes();
        this.updateIngredients();
        appliancesList.updateAppliances();
        ustensilsList.updateUstensils();
        this.removeIngredient(ingredient);
      });
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    });
  }
}
