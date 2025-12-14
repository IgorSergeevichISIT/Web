const {UsersRepository} = require('./UsersRepository');

class UserDAO {
    constructor(data) {

        this.id = data.id;
        this.first_name = data.first_name || '';
        this.last_name = data.last_name || '';
        this.photo_400_orig = data.photo_400_orig || '';
        this.city = data.city || null;
        this.bdate = data.bdate || '';
        this.sex = data.sex || 0;
        this.online = data.online || false;
        this.last_seen = data.last_seen || null;
        this.counters = data.counters || null;
        this.personal = data.personal || null;
        this.relation = data.relation || 0;
        this.about = data.about || '';
        this.isCustom = data.isCustom || false;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('ID должен быть числом');
        }
        return numberId;
    }

    static _validate(user) {
        if (!user.first_name || user.first_name.trim() === '') {
            throw new Error('Имя обязательно');
        }
        if (!user.last_name || user.last_name.trim() === '') {
            throw new Error('Фамилия обязательна');
        }
        if (!user.photo_400_orig || user.photo_400_orig.trim() === '') {
            throw new Error('Фото обязательно');
        }
    }

    static findCustom() {
        const users = UsersRepository.read();
        return users.map(user => new this(user));
    }

    static findCustomById(id) {
        this._validateId(id);
        
        const users = UsersRepository.read();
        const user = users.find(u => u.id === id);
        
        if (!user) {
            throw new Error(`Добавленный пользователь с ID ${id} не найден`);
        }
        
        return new this(user);
    }

    static insert(userData) {
        this._validate(userData);
        
        const users = UsersRepository.read();

        const newId = users.length > 0 ? Math.min(...users.map(u => u.id)) - 1 : -1;
        
        const newUser = {
            id: newId,
            first_name: userData.first_name,
            last_name: userData.last_name,
            photo_400_orig: userData.photo_400_orig,
            city: userData.city || null,
            bdate: userData.bdate || '',
            sex: userData.sex || 0,
            online: userData.online || false,
            last_seen: userData.last_seen || null,
            counters: userData.counters || null,
            personal: userData.personal || null,
            relation: userData.relation || 0,
            about: userData.about || '',
            isCustom: true
        };
        
        users.push(newUser);
        UsersRepository.write(users);
        
        return new this(newUser);
    }

    static delete(id) {
        this._validateId(id);
        
        const users = UsersRepository.read();
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new Error(`Добавленный пользователь с ID ${id} не найден`);
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        UsersRepository.write(users);
        
        return new this(deletedUser);
    }

    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            photo_400_orig: this.photo_400_orig,
            city: this.city,
            bdate: this.bdate,
            sex: this.sex,
            online: this.online,
            last_seen: this.last_seen,
            counters: this.counters,
            personal: this.personal,
            relation: this.relation,
            about: this.about,
            isCustom: this.isCustom
        };
    }
}

module.exports = {
    UserDAO,
};