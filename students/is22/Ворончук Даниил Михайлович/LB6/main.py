from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from typing import List

app = FastAPI()

DATA_FILE = "C:/Users/danii/Desktop/LB6/LB6/db/dogs.json"


class Dog(BaseModel):
    id: int
    name: str
    src: str
    info: str
    pos: int
    show: str
    collapse: str


def read_data():
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)


@app.get("/dogs/", response_model=List[Dog])
async def get_dogs():
    return read_data()


@app.get("/dogs/{dog_id}", response_model=Dog)
async def get_dog(dog_id: int):
    dogs = read_data()
    for dog in dogs:
        if dog["id"] == dog_id:
            return dog
    raise HTTPException(status_code=404, detail="Dog not found")


@app.post("/dogs/", response_model=Dog)
async def create_dog(dog: Dog):
    dogs = read_data()
    dogs.append(dog.dict())
    write_data(dogs)
    return dog


@app.put("/dogs/{dog_id}", response_model=Dog)
async def update_dog(dog_id: int, updated_dog: Dog):
    dogs = read_data()
    for i, dog in enumerate(dogs):
        if dog["id"] == dog_id:
            dogs[i] = updated_dog.dict()
            write_data(dogs)
            return updated_dog
    raise HTTPException(status_code=404, detail="Dog not found")


@app.delete("/dogs/{dog_id}")
async def delete_dog(dog_id: int):
    dogs = read_data()
    for i, dog in enumerate(dogs):
        if dog["id"] == dog_id:
            del dogs[i]
            write_data(dogs)
            return {"message": "Dog deleted"}
    raise HTTPException(status_code=404, detail="Dog not found")
