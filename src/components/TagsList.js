class TagsList {
  constructor() {
    this.tags = [];
  }

  addTag(tag) {
    this.tags.push(tag);
    this.render();
  }

  removeTag(tag) {
    this.tags = this.tags.filter((item) => item.name !== tag);
    this.render();
  }

  render() {
    const tagsList = document.querySelector('.tags-list');
    if (this.tags.length > 0) {
      removeChildren(tagsList);
      this.tags.forEach((tag) => {
        const tagItem = document.createElement('div');
        tagItem.addEventListener('click', () => {
          if (tag.type === 'ingredient') {
            ingredientsList.addIngredient(tag.name);
          } else if (tag.type === 'appliance') {
            appliancesList.addAppliance(tag.name);
          } else if (tag.type === 'ustensil') {
            ustensilsList.addUstensil(tag.name);
          }
          this.removeTag(tag.name);
          recipesList.updateRecipes();
          ingredientsList.updateIngredients();
          appliancesList.updateAppliances();
        });
        tagItem.classList.add('tag-item');
        tagItem.textContent = tag.name;
        tagsList.appendChild(tagItem);
      });
    } else {
      removeChildren(tagsList);
    }
  }
}
