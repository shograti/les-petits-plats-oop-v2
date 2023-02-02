class ComboBox {
  constructor(type, list) {
    this.type = type;
    this.list = list;
    this.isListDisplayed = false;
    this.comboBox = document.querySelector(`.${this.type}_list`);
    this.comboBoxDropDown = document.querySelector(`.${this.type}_dropdown`);
    this.comboBoxTitle = document.querySelector(`.${this.type}_list_title`);
    this.comboBoxSearchBar = document.querySelector(`.${this.type}_search`);
  }

  addItem(item) {
    this.list.push(item);
    this.render();
  }

  removeItem(itemToRemove) {
    this.list = this.list.filter((item) => item !== itemToRemove);
    this.render();
  }

  updateList() {
    console.log(tagsList.tags);
    const filteredRecipes = filterRecipes();
    const filteredList = new Set();
    filteredRecipes.forEach((recipe) => {
      if (this.type === "appliance") {
        filteredList.add(recipe[this.type].toLowerCase());
      } else {
        recipe[this.type].forEach((item) => {
          if (this.type === "ingredients") {
            filteredList.add(item.ingredient.toLowerCase());
          } else {
            filteredList.add(item.toLowerCase());
          }
        });
      }
    });
    tagsList.tags.forEach((tag) => {
      if (tag.type === this.type) {
        filteredList.delete(tag.name);
      }
    });
    this.list = [...filteredList];
    this.render();
  }

  render() {
    this.comboBoxSearchBar.addEventListener("keyup", (e) => {
      if (e.target.value.length > 0) {
        const filteredList = this.list.filter((item) =>
          item.toLowerCase().includes(e.target.value.toLowerCase()),
        );
        removeChildren(this.comboBox);
        filteredList.forEach((item) => {
          const listItem = document.createElement("p");
          listItem.addEventListener("click", () => {
            tagsList.addTag({ type: this.type, name: item });
            this.removeItem(item);
          });
          listItem.textContent = item;
          this.comboBox.appendChild(listItem);
        });
      } else {
        removeChildren(this.comboBox);
        this.list.forEach((item, index) => {
          if (index <= 30) {
            const listItem = document.createElement("p");
            listItem.addEventListener("click", () => {
              tagsList.addTag({ type: this.type, name: item });
              this.removeItem(item);
              displayedLists.forEach((list) => {
                list.updateList();
              });
              recipeList.updateRecipes();
            });
            listItem.textContent = item;
            this.comboBox.appendChild(listItem);
          }
        });
      }
    });
    displayedLists.forEach((list) => {
      list.comboBoxDropDown.removeEventListener("click", () => {});
    });

    this.comboBoxDropDown.addEventListener("click", () => {
      if (!this.isListDisplayed) {
        this.comboBoxDropDown.style.transform = "rotate(180deg)";
        this.comboBox.style.display = "grid";
        this.comboBoxTitle.style.display = "none";
        this.comboBoxSearchBar.style.display = "block";
        this.isListDisplayed = true;
      } else {
        this.comboBoxDropDown.style.transform = "rotate(0deg)";
        this.comboBox.style.display = "none";
        this.comboBoxTitle.style.display = "block";
        this.comboBoxSearchBar.style.display = "none";
        this.isListDisplayed = false;
      }
    });

    removeChildren(this.comboBox);

    this.list.forEach((item, index) => {
      if (index <= 30) {
        const listItem = document.createElement("p");
        listItem.addEventListener("click", () => {
          tagsList.addTag({ type: this.type, name: item });
          this.removeItem(item);
          displayedLists.forEach((list) => {
            list.updateList();
          });
          recipeList.updateRecipes();
        });
        listItem.textContent = item;
        this.comboBox.appendChild(listItem);
      }
    });
  }
}
