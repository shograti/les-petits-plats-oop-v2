class AppliancesList {
  constructor() {
    this.appliances = appliances;
  }

  addAppliance(appliance) {
    this.appliances.push(appliance);
    this.render();
  }

  removeAppliance(appliance) {
    this.appliances = this.appliances.filter((item) => item !== appliance);
    this.render();
  }

  updateAppliances() {
    this.appliances = appliancesList;
    const filteredRecipes = filterRecipes();
    const filteredAppliances = [];
    filteredRecipes.forEach((recipe) => {
      filteredAppliances.push(recipe.appliance.toLowerCase());
    });
    tagsList.tags.forEach((tag) => {
      if (tag.type === 'appliance') {
        filteredAppliances.forEach((appliance, index) => {
          if (appliance === tag.name) {
            filteredAppliances.splice(index, 1);
          }
        });
      }
    });
    this.appliances = filteredAppliances;

    this.render();
  }

  render() {
    const appliancesList = document.querySelector('.appliances-list');
    removeChildren(appliancesList);
    this.appliances.forEach((appliance) => {
      const applianceItem = document.createElement('p');
      applianceItem.addEventListener('click', () => {
        tagsList.addTag({ type: 'appliance', name: appliance });
        recipesList.updateRecipes();
        ingredientsList.updateIngredients();
        ustensilsList.updateUstensils();
        this.updateAppliances();
        this.removeAppliance(appliance);
      });
      applianceItem.classList.add('appliance-item');
      applianceItem.textContent = appliance;
      appliancesList.appendChild(applianceItem);
    });
    return appliancesList;
  }
}
