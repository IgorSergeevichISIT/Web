const { UsersRepository } = require('./UsersRepository');

class UserDAO {
    constructor(id, first_name, last_name, photo_200, photo_100, is_closed, can_access_closed) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.photo_200 = photo_200;
        this.photo_100 = photo_100;
        this.is_closed = is_closed;
        this.can_access_closed = can_access_closed;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('Invalid user id');
        }
        return numberId;
    }

    static _validate(user) {
        if (!user.first_name || !user.last_name) {
            throw new Error('First name and last name are required');
        }
    }

    static find() {
        const users = UsersRepository.read();
        return users.map(user => new this(
            user.id,
            user.first_name,
            user.last_name,
            user.photo_200,
            user.photo_100,
            user.is_closed,
            user.can_access_closed
        ));
    }

    static findById(id) {
        this._validateId(id);
        const users = UsersRepository.read();
        const user = users.find(u => u.id === id);
        
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        
        return new this(
            user.id,
            user.first_name,
            user.last_name,
            user.photo_200,
            user.photo_100,
            user.is_closed,
            user.can_access_closed
        );
    }

    static create(userData) {
        this._validate(userData);
        
        const users = UsersRepository.read();
        
        // Генерируем новый ID если не указан
        const newId = userData.id || Math.max(...users.map(u => u.id), 0) + 1;
        
        const newUser = {
            id: newId,
            first_name: userData.first_name,
            last_name: userData.last_name,
            photo_200: userData.photo_200 || 'https://vk.com/images/camera_200.png',
            photo_100: userData.photo_100 || 'https://vk.com/images/camera_100.png',
            is_closed: userData.is_closed || false,
            can_access_closed: userData.can_access_closed || true
        };
        
        users.push(newUser);
        UsersRepository.write(users);
        
        return new this(
            newUser.id,
            newUser.first_name,
            newUser.last_name,
            newUser.photo_200,
            newUser.photo_100,
            newUser.is_closed,
            newUser.can_access_closed
        );
    }

    static delete(id) {
        this._validateId(id);
        const users = UsersRepository.read();
        const filteredUsers = users.filter(u => u.id !== id);
        
        if (filteredUsers.length === users.length) {
            throw new Error(`User with id ${id} not found`);
        }
        
        UsersRepository.write(filteredUsers);
        
        return filteredUsers.map(user => new this(
            user.id,
            user.first_name,
            user.last_name,
            user.photo_200,
            user.photo_100,
            user.is_closed,
            user.can_access_closed
        ));
    }

    // Обычный JSON для REST API
    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            photo_200: this.photo_200,
            photo_100: this.photo_100,
            is_closed: this.is_closed,
            can_access_closed: this.can_access_closed
        };
    }

    // VK API совместимый JSON
    toVKJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            photo_200: this.photo_200,
            photo_100: this.photo_100,
            photo_400_orig: this.photo_200, // Для совместимости с фронтендом
            is_closed: this.is_closed,
            can_access_closed: this.can_access_closed,
            city: { id: 1, title: "Москва" },
            bdate: "01.01.1990"
        };
    }
}

module.exports = {
    UserDAO,
};