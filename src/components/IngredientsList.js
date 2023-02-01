class IngredientsList {
  constructor() {
    this.ingredients = ingredients;
    this.isListDisplayed = false;
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
    const filteredIngredients = new Set();
    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        filteredIngredients.add(ingredient.ingredient.toLowerCase());
      });
    });

    tagsList.tags.forEach((tag) => {
      if (tag.type === 'ingredient') {
        filteredIngredients.delete(tag.name);
      }
    });
    this.ingredients = [...filteredIngredients];
    this.render();
  }

  render() {
    const ingredientsList = document.querySelector('.ingredients_list');
    const ingredientsDropwdown = document.querySelector(
      '.ingredients_dropdown'
    );
    const ingredientsListTitle = document.querySelector(
      '.ingredients_list_title'
    );
    const ingredientsSearchBar = document.querySelector('.ingredients_search');

    ingredientsDropwdown.removeEventListener('click', () => {});

    ingredientsDropwdown.addEventListener('click', () => {
      if (!this.isListDisplayed) {
        ingredientsDropwdown.style.transform = 'rotate(180deg)';
        ingredientsList.style.display = 'grid';
        ingredientsListTitle.style.display = 'none';
        ingredientsSearchBar.style.display = 'block';
        this.isListDisplayed = true;
      } else {
        ingredientsDropwdown.style.transform = 'rotate(0deg)';
        ingredientsList.style.display = 'none';
        ingredientsListTitle.style.display = 'block';
        ingredientsSearchBar.style.display = 'none';
        this.isListDisplayed = false;
      }
    });

    removeChildren(ingredientsList);

    this.ingredients.forEach((ingredient, index) => {
      if (index <= 30) {
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
      }
    });
  }
}
