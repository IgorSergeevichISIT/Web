const {DogDAO} = require('./DogsDAO');

class DogsService {
    static findDogs(id) {
        if (id !== undefined) {
            return DogDAO.findById(id).toJSON();
        }

        return DogDAO.find().map((dog) => dog.toJSON());
    }

    static addDog(dog) {
        return DogDAO.insert(dog).toJSON();
    }

    static deleteDog(id) {
        return DogDAO.delete(id).map((dog) => dog.toJSON());
    }
}

module.exports = {
    DogsService,
}