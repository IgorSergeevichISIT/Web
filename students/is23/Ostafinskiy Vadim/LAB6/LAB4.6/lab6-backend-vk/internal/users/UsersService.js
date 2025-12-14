const {UserDAO} = require('./UserDAO');
const {VKAPI} = require('../../modules/VKAPI');

class UsersService {
    static vkApi = new VKAPI();

    static async getAllUsers(sort = '') {
        try {
            const vkResponse = await this.vkApi.getGroupMembers(sort);
            let vkUsers = [];
            
            if (vkResponse.response && vkResponse.response.items) {
                vkUsers = vkResponse.response.items.map(user => ({
                    ...user,
                    isCustom: false
                }));
            }

            const customUsers = UserDAO.findCustom().map(user => user.toJSON());

            return [...customUsers, ...vkUsers];
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            throw error;
        }
    }

    static async getUserById(id) {
        const userId = parseInt(id);

        if (userId < 0) {
            return UserDAO.findCustomById(userId).toJSON();
        }

        try {
            const response = await this.vkApi.getUserInfo(userId);
            if (response.error) {
                throw new Error(response.error);
            }
            
            if (response.response && response.response[0]) {
                return {
                    ...response.response[0],
                    isCustom: false
                };
            }
            
            throw new Error('Пользователь не найден');
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            throw error;
        }
    }

    static addUser(userData) {
        const user = UserDAO.insert(userData);
        return user.toJSON();
    }

    static deleteUser(id) {
        const userId = parseInt(id);

        if (userId >= 0) {
            throw new Error('Можно удалять только добавленных пользователей');
        }
        
        const deletedUser = UserDAO.delete(userId);
        return {
            message: `Пользователь "${deletedUser.first_name} ${deletedUser.last_name}" удален`,
            deletedUser: deletedUser.toJSON()
        };
    }
}

module.exports = {
    UsersService,
};