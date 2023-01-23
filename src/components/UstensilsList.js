class UstensilsList {
  constructor() {
    this.ustensils = ustensils;
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
    const filteredUstensils = [];
    filteredRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        filteredUstensils.push(ustensil.toLowerCase());
      });
    });
    tagsList.tags.forEach((tag) => {
      if (tag.type === 'ustensil') {
        filteredUstensils.forEach((ustensil, index) => {
          if (ustensil === tag.name) {
            filteredUstensils.splice(index, 1);
          }
        });
      }
    });

    this.ustensils = filteredUstensils;

    this.render();
  }

  render() {
    const ustensilsList = document.querySelector('.ustensils-list');
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
      ustensilItem.classList.add('ustensil-item');
      ustensilItem.textContent = ustensil;
      ustensilsList.appendChild(ustensilItem);
    });
  }
}
