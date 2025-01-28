const {DBConnector} = require('../../modules/DBConnector');

class DogsRepository {
    static db = new DBConnector('dogs.json');

    static read() {
        const file = this.db.readFile();

        return JSON.parse(file);
    }

    static write(json) {
        this.db.writeFile(JSON.stringify(json));
    }
}

module.exports = {
    DogsRepository,
}