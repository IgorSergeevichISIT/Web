const { UserDAO } = require('./UserDAO');

class UserService {
  static getUsers(sort = 'id_asc') {
    let users = UserDAO.getAll();
    users = UserDAO.sortBy(users, sort);
    return users.map(u => u.toJSON());
  }

  static getUserById(id) {
    const user = UserDAO.getById(id);
    return user ? user.toJSON() : null;
  }

  static createUser(userData) {
    const user = UserDAO.insert(userData);
    return user.toJSON();
  }

  static deleteUser(id) {
    return UserDAO.deleteById(id);
  }
}

module.exports = { UserService };