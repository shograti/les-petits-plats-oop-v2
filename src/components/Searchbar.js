class SearchBar {
  constructor() {
    this.searchBar = document.getElementById("search-input");
    this.searchBar.addEventListener("keyup", (e) => {

      if (e.target.value.length === 0) {
        recipeList.firstRender();
      }
      if (e.target.value.length > 2) {
        recipeList.updateRecipesBySearch(e.target.value);
      }
    });
  }
}
