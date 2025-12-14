const { DBConnector } = require('../../modules/DBConnector');

class UserRepository {
  static db = new DBConnector('users.json');

  static read() {
    return this.db.readFile();
  }

  static write(users) {
    this.db.writeFile(users);
  }
}

module.exports = { UserRepository };