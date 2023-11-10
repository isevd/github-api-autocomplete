export class Log {
  counterMessage(repositoriesCount) {
    return repositoriesCount > 0 ? `${repositoriesCount} repositories found` : 'nothing found';
  }
}