const ingredients = getIngredients();
const ustensils = getUstensils();
const appliances = getAppliances();

const ingredientsList = new IngredientsList(ingredients);
const appliancesList = new AppliancesList(appliances);
const ustensilsList = new UstensilsList(ustensils);
const recipesList = new RecipesList(recipes);
const tagsList = new TagsList();

recipesList.firstRender();
ingredientsList.render();
ustensilsList.render();
appliancesList.render();
tagsList.render();
