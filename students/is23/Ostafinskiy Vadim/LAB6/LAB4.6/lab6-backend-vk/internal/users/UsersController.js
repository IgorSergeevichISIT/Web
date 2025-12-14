const {UsersService} = require('./UsersService');

class UsersController {
    static async getAllUsers(req, res) {
        try {
            const sort = req.query.sort || '';
            const users = await UsersService.getAllUsers(sort);
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: err.message
            });
        }
    }

    static async getVKUsers(req, res) {
        try {
            const sort = req.query.sort || '';
            const users = await UsersService.getVKUsers(sort);
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: err.message
            });
        }
    }

    static getCustomUsers(req, res) {
        try {
            const users = UsersService.getCustomUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: err.message
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await UsersService.getUserById(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(404).json({
                status: 'Not Found',
                message: err.message
            });
        }
    }

    static addUser(req, res) {
        try {
            const userData = req.body;
            const newUser = UsersService.addUser(userData);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({
                status: 'Bad Request',
                message: err.message
            });
        }
    }

    static deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = UsersService.deleteUser(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({
                status: 'Bad Request',
                message: err.message
            });
        }
    }
}

module.exports = {
    UsersController,
};