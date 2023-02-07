function getIngredients() {
  const ingredients = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient.toLowerCase());
    });
  });
  return [...ingredients];
}

function getAppliances() {
  const appliances = new Set();
  recipes.forEach((recipe) => {
    appliances.add(recipe.appliance.toLowerCase());
  });
  return [...appliances];
}

function getUstensils() {
  const ustensils = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil.toLowerCase());
    });
  });
  return [...ustensils];
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function filterRecipes() {
  const ingredientsFilter = tagsList.tags.filter(
    (tag) => tag.type === "ingredients",
  );
  const appliancesFilter = tagsList.tags.filter(
    (tag) => tag.type === "appliance",
  );
  const ustensilsFilter = tagsList.tags.filter(
    (tag) => tag.type === "ustensils",
  );

  const filteredRecipes = recipes.filter((recipe) => {
    let ingredientMatch = true;
    let applianceMatch = true;
    let ustensilMatch = true;
    if (ingredientsFilter.length > 0) {
      ingredientMatch = ingredientsFilter.every((tag) =>
        recipe.ingredients.some(
          (ingredient) => ingredient.ingredient.toLowerCase() === tag.name,
        ),
      );
    }
    if (appliancesFilter.length > 0) {
      applianceMatch = appliancesFilter.every((tag) =>
        recipe.appliance.toLowerCase().includes(tag.name),
      );
    }
    if (ustensilsFilter.length > 0) {
      ustensilMatch = ustensilsFilter.every((tag) =>
        recipe.ustensils.some(
          (ustensil) => ustensil.toLowerCase() === tag.name,
        ),
      );
    }
    return ingredientMatch && applianceMatch && ustensilMatch;
  });
  return filteredRecipes;
}

function filterRecipesBySearch(searchTerm) {
  const filteredRecipes = new Set();
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    if (recipe.name.includes(searchTerm)) {
      filteredRecipes.add(recipe);
    }
    if (recipe.description.includes(searchTerm)) {
      filteredRecipes.add(recipe);
    }
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      console.log(recipe);
      if (ingredient.ingredient.includes(searchTerm)) {
        filteredRecipes.add(recipe);
      }
    }
  }
  return filteredRecipes;
}
