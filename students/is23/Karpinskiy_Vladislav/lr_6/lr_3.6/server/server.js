const express = require("express");

const cors = require("cors"); // 👈 ДОБАВЬ

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

const fs = require("fs");
const path = require("path");

const readDB = () => {
    const file = fs.readFileSync(
        path.join(__dirname, "db", "dogs.json"),
        "utf8"
    );

    return JSON.parse(file);
};

app.get("/dogs", (req, res) => {
    const dogs = readDB();
    res.send(dogs);
});

app.get("/dogs/:id", (req, res) => {
    const dogs = readDB();

    const dog = dogs.find(d => d.id === +req.params.id);

    if (!dog) {
        return res.status(404).send({ message: "Not found" });
    }

    res.send(dog);
});

app.post("/dogs", (req, res) => {
    console.log("POST /dogs", req.body); // 👈 ВАЖНО

    const dogs = readDB();

    const newDog = {
        id: Date.now(),
        ...req.body
    };

    dogs.push(newDog);

    fs.writeFileSync(
        path.join(__dirname, "db", "dogs.json"),
        JSON.stringify(dogs, null, 2)
    );

    res.json(newDog);
});

app.delete("/dogs/:id", (req, res) => {
    const dogs = readDB();

    const filtered = dogs.filter(d => d.id !== +req.params.id);

    fs.writeFileSync(
        path.join(__dirname, "db", "dogs.json"),
        JSON.stringify(filtered, null, 2)
    );

    res.send({ ok: true });
});

app.put("/dogs/:id", (req, res) => {

    const dogs = readDB();

    const id = +req.params.id;

    const updatedDogs = dogs.map(d => {
        if (d.id === id) {
            return {
                ...d,
                ...req.body
            };
        }
        return d;
    });

    fs.writeFileSync(
        path.join(__dirname, "db", "dogs.json"),
        JSON.stringify(updatedDogs, null, 2)
    );

    res.send({ ok: true });
});