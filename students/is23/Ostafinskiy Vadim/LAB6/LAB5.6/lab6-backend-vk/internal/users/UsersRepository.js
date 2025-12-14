const {DBConnector} = require('../../modules/DBConnector');

class UsersRepository {
    static db = new DBConnector('vk-users.json');

    static read() {
        const file = this.db.readFile();
        return JSON.parse(file);
    }

    static write(json) {
        this.db.writeFile(JSON.stringify(json, null, 2));
    }
}

module.exports = {
    UsersRepository,
};