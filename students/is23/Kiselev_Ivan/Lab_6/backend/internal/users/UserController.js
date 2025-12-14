const { UserService } = require('./UserService');

class UserController {
  static async getUsers(req, res) {
    try {
      const sort = req.query.sort || 'id_asc';
      const users = UserService.getUsers(sort);
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async createUser(req, res) {
    try {
      const user = UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const success = UserService.deleteUser(id);
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = { UserController };