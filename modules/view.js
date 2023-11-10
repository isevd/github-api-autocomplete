export class View {
  constructor(api) {
    this.app = document.getElementById("app");
    this.api = api;

    this.searchLine = this.createElement("div", "search-line");
    this.searchInput = this.createElement("input", "search-input");
    this.searchInput.placeholder = "Type to search...";
    this.searchWrapper = this.createElement("div", "search-wrapper");
    this.searchList = this.createElement("ul", "search-list");
    this.searchCounter = this.createElement("span", "counter");

    this.searchLine.append(this.searchInput);
    this.searchLine.prepend(this.searchCounter);
    this.searchLine.append(this.searchWrapper);
    this.searchWrapper.append(this.searchList);

    this.repositoriesWrapper = this.createElement(
      "div",
      "repositories-wrapper"
    );
    this.repositoriesList = this.createElement("div", "repositories");
    this.repositoriesWrapper.append(this.repositoriesList);

    this.app.append(this.searchLine);
    this.app.append(this.repositoriesWrapper);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }

  createRepository(repositoryData) {
    const repositoryElement = this.createElement("li", "repository");
    repositoryElement.addEventListener("click", () => this.showUserData(repositoryData))
    repositoryElement.textContent = `${repositoryData.name}`;
    this.searchList.append(repositoryElement);
  }

  showUserData(repositoryData) {
    const user = this.createElement("div", "user")
    const repositoryName = this.createElement("div", "repository-name");
    const userName = this.createElement("div", "user-name");
    const repositoryStars = this.createElement("div", "repository-stars");
    const closeButton = this.createElement("button", "close")
    repositoryName.textContent = `Name: ${repositoryData.name}`;
    userName.textContent = `Owner: ${repositoryData.owner.login}`;
    repositoryStars.textContent = `Stars: ${repositoryData.stargazers_count}`;
    user.append(repositoryName);
    user.append(userName);
    user.append(repositoryStars);
    user.append(closeButton);
    this.repositoriesList.append(user)
    closeButton.addEventListener("click", (e) => {
      let delBtn = e.target.closest(".user");
      delBtn.remove()
    })
  }

  setCounterMessage(message) {
    this.searchCounter.textContent = message;
  }
}
