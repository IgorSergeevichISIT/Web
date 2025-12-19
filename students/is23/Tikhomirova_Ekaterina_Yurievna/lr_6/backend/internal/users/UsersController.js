const { UsersService } = require('./UsersService');

class UsersController {
    static getUsers(req, res) {
        try {
            const filter = req.query.filter || 'all';
            const vkApiFormat = req.query.vk_api === 'true';
            
            const users = UsersService.getUsers(filter, vkApiFormat);
            
            if (vkApiFormat) {
                // VK API формат
                res.json({
                    response: {
                        count: users.length,
                        items: users,
                        next_from: ""
                    }
                });
            } else {
                // REST API формат
                res.json({
                    count: users.length,
                    users: users
                });
            }
        } catch (err) {
            if (req.query.vk_api === 'true') {
                res.status(400).json({
                    error: {
                        error_code: 400,
                        error_msg: err.message
                    }
                });
            } else {
                res.status(400).json({
                    error: {
                        code: 400,
                        message: err.message
                    }
                });
            }
        }
    }

    static getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const vkApiFormat = req.query.vk_api === 'true';
            
            const user = UsersService.getUserById(userId, vkApiFormat);
            
            if (vkApiFormat) {
                // VK API формат
                res.json({
                    response: [user]
                });
            } else {
                // REST API формат
                res.json({
                    user: user
                });
            }
        } catch (err) {
            if (req.query.vk_api === 'true') {
                res.status(404).json({
                    error: {
                        error_code: 404,
                        error_msg: err.message
                    }
                });
            } else {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: err.message
                    }
                });
            }
        }
    }

    static createUser(req, res) {
        try {
            const newUser = UsersService.createUser(req.body);
            
            res.status(201).json({
                user: newUser
            });
        } catch (err) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: err.message
                }
            });
        }
    }

    static deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const users = UsersService.deleteUser(userId);
            
            res.json({
                count: users.length,
                users: users
            });
        } catch (err) {
            res.status(404).json({
                error: {
                    code: 404,
                    message: err.message
                }
            });
        }
    }
}

module.exports = {
    UsersController,
};