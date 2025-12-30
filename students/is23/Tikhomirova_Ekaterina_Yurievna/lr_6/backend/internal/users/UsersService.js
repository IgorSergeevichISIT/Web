const { UserDAO } = require('./UserDAO');

class UsersService {
    static getUsers(filter = 'all', vkApiFormat = false) {
        const users = UserDAO.find();
        
        let filteredUsers = users;
        if (filter === 'friends') {
            filteredUsers = users.filter(user => !user.is_closed);
        } else if (filter === 'managers') {
            filteredUsers = users.slice(0, 2);
        }
        
        if (vkApiFormat) {
            return filteredUsers.map(user => user.toVKJSON());
        }
        
        return filteredUsers.map(user => user.toJSON());
    }

    static getUserById(id, vkApiFormat = false) {
        const user = UserDAO.findById(id);
        
        if (vkApiFormat) {
            return user.toVKJSON();
        }
        
        return user.toJSON();
    }

    static createUser(userData) {
        const user = UserDAO.create(userData);
        return user.toJSON();
    }

    static deleteUser(id) {
        const users = UserDAO.delete(id);
        return users.map(user => user.toJSON());
    }
}

module.exports = {
    UsersService,
};