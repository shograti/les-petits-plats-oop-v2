class UstensilsList {
  constructor() {
    this.ustensils = ustensils;
    this.isListDisplayed = false;
  }

  addUstensil(ustensil) {
    this.ustensils.push(ustensil);
    this.render();
  }

  removeUstensil(ustensil) {
    this.ustensils = this.ustensils.filter((item) => item !== ustensil);
    this.render();
  }

  updateUstensils() {
    this.ustensils = ustensilsList;
    const filteredRecipes = filterRecipes();
    const filteredUstensils = new Set(); 
    filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        filteredUstensils.add(ustensil.toLowerCase());
      });
    });
    tagsList.tags.forEach((tag) => {
      if (tag.type === 'ustensil') {
        filteredUstensils.delete(tag.name); 
      }
    });
    this.ustensils = [...filteredUstensils];

    this.render();
  }

  render() {
    const ustensilsList = document.querySelector('.ustensils_list');
    const ustensilsDropwdown = document.querySelector('.ustensils_dropdown');
    const ustensilsListTitle = document.querySelector('.ustensils_list_title');
    const ustensilsSearchBar = document.querySelector('.ustensils_search');

    ustensilsDropwdown.removeEventListener('click', () => {});

    ustensilsDropwdown.addEventListener('click', () => {
      if (!this.isListDisplayed) {
        ustensilsDropwdown.style.transform = 'rotate(180deg)';
        ustensilsList.style.display = 'grid';
        ustensilsListTitle.style.display = 'none';
        ustensilsSearchBar.style.display = 'block';
        this.isListDisplayed = true;
      } else {
        ustensilsDropwdown.style.transform = 'rotate(0deg)';
        ustensilsList.style.display = 'none';
        ustensilsListTitle.style.display = 'block';
        ustensilsSearchBar.style.display = 'none';
        this.isListDisplayed = false;
      }
    });

    removeChildren(ustensilsList);

    this.ustensils.forEach((ustensil) => {
      const ustensilItem = document.createElement('p');
      ustensilItem.addEventListener('click', () => {
        tagsList.addTag({ type: 'ustensil', name: ustensil });
        recipesList.updateRecipes();
        this.updateUstensils();
        ingredientsList.updateIngredients();
        appliancesList.updateAppliances();
        this.removeUstensil(ustensil);
      });
      ustensilItem.textContent = ustensil;
      ustensilsList.appendChild(ustensilItem);
    });
  }
}
