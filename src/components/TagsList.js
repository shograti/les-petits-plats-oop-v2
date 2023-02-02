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
    const tagsList = document.querySelector(".tags_list");
    removeChildren(tagsList);
    this.tags.forEach((tag) => {
      const tagContainer = document.createElement("div");
      const tagItem = document.createElement("p");
      const tagCloseIcon = document.createElement("img");
      tagCloseIcon.setAttribute("src", "./assets/close.png");
      tagContainer.classList.add("tag_container");

      tagCloseIcon.addEventListener("click", () => {
        this.removeTag(tag.name);
        recipeList.updateRecipes();
        displayedLists.forEach((list) => {
          list.updateList();
        });
      });

      if (tag.type === "ingredients") {
        tagContainer.classList.add("tag_blue");
      }
      if (tag.type === "appliance") {
        tagContainer.classList.add("tag_orange");
      }
      if (tag.type === "ustensils") {
        tagContainer.classList.add("tag_green");
      }
      tagItem.textContent = tag.name;
      tagContainer.appendChild(tagItem);
      tagContainer.appendChild(tagCloseIcon);
      tagsList.appendChild(tagContainer);
    });
  }
}
