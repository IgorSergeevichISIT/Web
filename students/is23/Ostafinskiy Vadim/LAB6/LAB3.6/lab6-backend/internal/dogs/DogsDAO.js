const {DogsRepository} = require('./DogsRepository');

class DogsDAO {
    constructor(id, breed, shortDescription, image, description, characteristics, temperament, care) {
        this.id = id;
        this.breed = breed;
        this.shortDescription = shortDescription;
        this.image = image;
        this.description = description;
        this.characteristics = characteristics;
        this.temperament = temperament;
        this.care = care;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('ID должен быть числом');
        }
        return numberId;
    }

    static _validate(dog) {
        if (!dog.breed || dog.breed.trim() === '') {
            throw new Error('Название породы обязательно');
        }
        if (!dog.shortDescription || dog.shortDescription.trim() === '') {
            throw new Error('Краткое описание обязательно');
        }
        if (!dog.image || dog.image.trim() === '') {
            throw new Error('URL изображения обязателен');
        }
    }

    static find() {
        const dogs = DogsRepository.read();
        return dogs.map(dog => new this(
            dog.id,
            dog.breed,
            dog.shortDescription,
            dog.image,
            dog.description || '',
            dog.characteristics || '',
            dog.temperament || '',
            dog.care || ''
        ));
    }

    static findById(id) {
        const validatedId = this._validateId(id);
        
        const dogs = DogsRepository.read();
        const dog = dogs.find(d => d.id === validatedId);
        
        if (!dog) {
            throw new Error(`Собака с ID ${validatedId} не найдена`);
        }
        
        return new this(
            dog.id,
            dog.breed,
            dog.shortDescription,
            dog.image,
            dog.description,
            dog.characteristics,
            dog.temperament,
            dog.care
        );
    }

    static insert(dog) {
        this._validate(dog);
        
        const dogs = DogsRepository.read();

        const newId = dogs.length > 0 ? Math.max(...dogs.map(d => d.id)) + 1 : 1;
        
        const newDog = {
            id: newId,
            breed: dog.breed,
            shortDescription: dog.shortDescription,
            image: dog.image,
            description: dog.description || '',
            characteristics: dog.characteristics || '',
            temperament: dog.temperament || '',
            care: dog.care || ''
        };

        dogs.push(newDog);
        DogsRepository.write(dogs);
        
        return new this(
            newDog.id,
            newDog.breed,
            newDog.shortDescription,
            newDog.image,
            newDog.description,
            newDog.characteristics,
            newDog.temperament,
            newDog.care
        );
    }

    static delete(id) {
        const validatedId = this._validateId(id);
        
        const dogs = DogsRepository.read();
        const dogIndex = dogs.findIndex(d => d.id === validatedId);
        
        if (dogIndex === -1) {
            throw new Error(`Собака с ID ${validatedId} не найдена`);
        }

        const deletedDog = dogs.splice(dogIndex, 1)[0];
        DogsRepository.write(dogs);
        
        return new this(
            deletedDog.id,
            deletedDog.breed,
            deletedDog.shortDescription,
            deletedDog.image,
            deletedDog.description,
            deletedDog.characteristics,
            deletedDog.temperament,
            deletedDog.care
        );
    }

    toJSON() {
        return {
            id: this.id,
            breed: this.breed,
            shortDescription: this.shortDescription,
            image: this.image,
            description: this.description,
            characteristics: this.characteristics,
            temperament: this.temperament,
            care: this.care
        };
    }
}

module.exports = {
    DogsDAO,
};