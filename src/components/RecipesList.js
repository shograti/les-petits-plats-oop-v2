class RecipesList {
  constructor(recipes) {
    this.recipes = recipes;
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
  }

  updateRecipes() {
    const filteredRecipes = filterRecipes();
    if (filteredRecipes.length === 0) {
      this.recipes = recipes;
      this.firstRender();
    } else {
      this.recipes = filterRecipes();
      this.render();
    }
  }

  updateRecipesBySearch(searchTerms) {
    const filteredRecipes = filterRecipesBySearch(searchTerms);
    this.recipes = filteredRecipes;
    this.render();
  }

  createCard(recipe) {
    const card = document.createElement("article");
    const imagePlaceholder = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardHeadRow = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const cardTimeContainer = document.createElement("div");
    const cardTimeText = document.createElement("p");
    const cardTimeIcon = document.createElement("img");
    const cardIngredients = document.createElement("div");
    const cardDescription = document.createElement("p");

    cardTitle.textContent = recipe.name;
    cardTimeIcon.setAttribute("src", "assets/clock.png");
    cardTimeText.textContent = `${recipe.time} min`;
    cardDescription.textContent = recipe.description.slice(0, 130) + "...";

    recipe.ingredients.forEach((ingredient) => {
      const ingredientContainer = document.createElement("p");
      const ingredientName = document.createElement("span");
      ingredientName.textContent = ingredient.ingredient;
      ingredientContainer.appendChild(ingredientName);
      ingredientContainer.append(
        `${ingredient.quantity ? " : " + ingredient.quantity : ""} ${
          ingredient.unit ? ingredient.unit : ""
        }`,
      );
      ingredientName.classList.add("ingredient_name");
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

    imagePlaceholder.classList.add("image_placeholder");
    cardHeadRow.classList.add("card_head_row");
    cardTimeContainer.classList.add("card_time_container");
    cardBody.classList.add("card_body");
    cardIngredients.classList.add("card_ingredients");
    cardDescription.classList.add("card_description");

    return card;
  }

  firstRender() {
    const recipesList = document.querySelector(".recipes_list");
    removeChildren(recipesList);
    this.recipes = recipes;
    this.recipes.forEach((recipe, index) => {
      if (index < 6) {
        const card = this.createCard(recipe);
        recipesList.appendChild(card);
      }
    });
  }

  render() {
    const recipesList = document.querySelector(".recipes_list");
    removeChildren(recipesList);
    if (this.recipes.length > 0) {
      this.recipes.forEach((recipe) => {
        const card = this.createCard(recipe);
        recipesList.appendChild(card);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "Aucune recette trouvée";
      recipesList.appendChild(p);
    }
  }
}
