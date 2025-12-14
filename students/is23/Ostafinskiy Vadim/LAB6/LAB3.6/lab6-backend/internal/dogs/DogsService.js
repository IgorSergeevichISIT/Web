const {DogsDAO} = require('./DogsDAO');

class DogsService {
    static getDogs(id) {
        if (id !== undefined) {
            const dog = DogsDAO.findById(id);
            return dog.toJSON();
        }
        
        const dogs = DogsDAO.find();
        return dogs.map(dog => dog.toJSON());
    }

    static addDog(dogData) {
        const dog = DogsDAO.insert(dogData);
        return dog.toJSON();
    }

    static deleteDog(id) {
        const deletedDog = DogsDAO.delete(id);
        return {
            message: `Собака "${deletedDog.breed}" удалена`,
            deletedDog: deletedDog.toJSON()
        };
    }
}

module.exports = {
    DogsService,
};