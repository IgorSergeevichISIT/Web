const {DogsRepository} = require('./DogsRepository');

class DogDAO {
    constructor(id, name, src, info, pos, show, collapse) {
        this.id = id;
        this.name = name;
        this.src = src;
        this.info = info;
        this.pos = pos;
        this.show = show;
        this.collapse = collapse;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('Неправильный формат id');
        }
    }

    static _validate(dog) {
        if (
            dog.id === undefined ||
            dog.name === undefined ||
            dog.src === undefined ||
            dog.info === undefined ||
            dog.pos === undefined || 
            dog.show === undefined ||
            dog.collapse === undefined
        ) {
            throw new Error('invalidate dog data');
        }

        this._validateId(dog.id);
    }

    static find() {
        const dogs = DogsRepository.read();

        return dogs.map(({id, name, src, info, pos, show, collapse}) => {
            return new this(id, name, src, info, pos, show, collapse);
        });
    }

    static findById(id) {
        this._validateId(id);

        const dogs = DogsRepository.read();
        const dog = dogs.find((d) => d.id === id);

        return new this(dog.id, dog.name, dog.src, dog.info, dog.pos, dog.show, dog.collapse);
    }

    static insert(dog) {
        this._validate(dog);

        const dogs = DogsRepository.read();
        DogsRepository.write([...dogs, dog]);

        return new this(dog.id, dog.name, dog.src, dog.info, dog.pos, dog.show, dog.collapse);
    }

    static delete(id) {
        this._validateId(id);

        const dogs = DogsRepository.read();

        const dogToDelete = dogs.find(d => d.id === id);

        if (!dogToDelete) {
            throw new Error(`Собака с ID ${id} не найдена`);
        }

        const filteredDogs = dogs.filter((d) => d.id !== id);

        DogsRepository.write(filteredDogs);

        return filteredDogs.map(({id, name, src, info, pos, show, collapse}) => {
            return new this(id, name, src, info, pos, show, collapse);
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            src: this.src,
            info: this.info,
            pos: this.pos,
            show: this.show,
            collapse: this.collapse
        }
    }
}

module.exports = {
    DogDAO,
}