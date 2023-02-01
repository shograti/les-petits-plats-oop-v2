class AppliancesList {
  constructor() {
    this.appliances = appliances;
    this.isListDisplayed = false;
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
    const filteredRecipes = filterRecipes();
    this.appliances = appliancesList;
    const filteredAppliances = new Set();
    filteredRecipes.forEach((recipe) => {
      filteredAppliances.add(recipe.appliance.toLowerCase());
    });

    tagsList.tags.forEach((tag) => {
      if (tag.type === 'appliance') {
        filteredAppliances.delete(tag.name);
      }
    });
    this.appliances = [...filteredAppliances];

    this.render();
  }

  render() {
    const appliancesList = document.querySelector('.appliances_list');
    const appliancesDropwdown = document.querySelector('.appliances_dropdown');
    const appliancesListTitle = document.querySelector(
      '.appliances_list_title'
    );
    const appliancesSearchBar = document.querySelector('.appliances_search');
    
    appliancesDropwdown.removeEventListener('click', () => {});
    appliancesDropwdown.addEventListener('click', () => {
      if (!this.isListDisplayed) {
        appliancesDropwdown.style.transform = 'rotate(180deg)';
        appliancesList.style.display = 'grid';
        appliancesListTitle.style.display = 'none';
        appliancesSearchBar.style.display = 'block';
        this.isListDisplayed = true;
      } else {
        appliancesDropwdown.style.transform = 'rotate(0deg)';
        appliancesList.style.display = 'none';
        appliancesListTitle.style.display = 'block';
        appliancesSearchBar.style.display = 'none';
        this.isListDisplayed = false;
      }
    });

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
