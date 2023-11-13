const URL = "https://api.github.com/";
const REPO_PER_PAGE = 5;

export class Api {
  async searchRepositories(searchValue) {
    return await fetch(
      `${URL}search/repositories?q=${searchValue}&per_page=${REPO_PER_PAGE}`
    );
  }
}
