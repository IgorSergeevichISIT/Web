const { UserRepository } = require('./UserRepository');

class UserDAO {
  constructor(id, first_name, last_name, photo_200, bdate, domain) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.photo_200 = photo_200;
    this.bdate = bdate;
    this.domain = domain;
  }

  static _validateId(id) {
    const num = Number(id);
    if (isNaN(num) || num <= 0) throw new Error('ID must be a positive integer');
    return num;
  }

  static _validateUser(user) {
    if (!user.first_name || !user.last_name) {
      throw new Error('First name and last name are required');
    }
  }

  static getAll() {
    const users = UserRepository.read();
    return users.map(u => new this(u.id, u.first_name, u.last_name, u.photo_200, u.bdate, u.domain));
  }

  static getById(id) {
    const numId = this._validateId(id);
    const users = UserRepository.read();
    const user = users.find(u => u.id === numId);
    if (!user) return null;
    return new this(user.id, user.first_name, user.last_name, user.photo_200, user.bdate, user.domain);
  }

  static insert(user) {
    this._validateUser(user);
    const users = UserRepository.read();
    const maxId = users.reduce((max, u) => Math.max(max, u.id), 0);
    const newId = maxId + 1;
    const newUser = { ...user, id: newId };
    UserRepository.write([...users, newUser]);
    return new this(newId, user.first_name, user.last_name, user.photo_200, user.bdate, user.domain);
  }

  static deleteById(id) {
    const numId = this._validateId(id);
    const users = UserRepository.read();
    const filtered = users.filter(u => u.id !== numId);
    if (filtered.length === users.length) return false;
    UserRepository.write(filtered);
    return true;
  }

  static sortBy(users, sortKey) {
    
    if (!sortKey.startsWith('id_')) {
      sortKey = 'id_asc'; // fallback
    }

    const order = sortKey.split('_')[1] || 'asc';
    return [...users].sort((a, b) => {
      const idA = Number(a.id);
      const idB = Number(b.id);
      if (order === 'asc') {
        return idA - idB;
      } else {
        return idB - idA;
      }
    });
  }

  toJSON() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      photo_200: this.photo_200,
      bdate: this.bdate,
      domain: this.domain
    };
  }
}

module.exports = { UserDAO };