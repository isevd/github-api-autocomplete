export class Search {
  setReposCount(count) {
    this.reposCount = count;
  }

  constructor(view, api, log) {
    this.view = view;
    this.api = api;
    this.log = log;

    this.view.searchInput.addEventListener(
      "input",
      this.debounce(this.searchRepositories.bind(this), 500)
    );
    this.reposCount = 0;
  }

  searchRepositories(event) {;
    const searchValue = event.target.value;
    this.view.setCounterMessage("");
    if (searchValue) {
      this.clearRepositories();
      this.repoRequest(searchValue);
    } else {
      this.clearRepositories();
    }
  }

  repoRequest() {
    this.api.searchRepositories().then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          let repositories = res.items;
          const totalCount = res.total_count;
          const message = this.log.counterMessage(totalCount);
          this.setReposCount(this.reposCount + res.items.length);
          this.view.setCounterMessage(message);
          repositories.forEach((repository) =>
            this.view.createRepository(repository)
          );
        });
      }
    });
  }

  clearRepositories() {
    this.view.searchList.textContent = "";
  }

  debounce(fn, debounceTime) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, debounceTime);
    };
  }
}
