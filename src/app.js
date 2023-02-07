const lists = [
  { type: "ingredients", list: getIngredients() },
  { type: "ustensils", list: getUstensils() },
  { type: "appliance", list: getAppliances() },
];

const displayedLists = [];

lists.forEach((list) => {
  const comboBox = new ComboBox(list.type, list.list);
  comboBox.render();
  displayedLists.push(comboBox);
});

console.log(displayedLists);

const recipeList = new RecipesList(recipes);

recipeList.firstRender();

const tagsList = new TagsList();

const searchBar = new SearchBar();
