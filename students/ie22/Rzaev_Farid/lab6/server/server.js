const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express(); 

const host = 'localhost';
const port = 8000;
const storageName = 'stocks.json';

const readJson = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, fileName), "utf8");
    const json = JSON.parse(file);
    return json;    
};

app.use(express.json());

app.get('/stocks', (req, res) => {
    const stocks = readJson(storageName);
    res.send(stocks);
});
app.post('/stocks/add', (req) => {
    const uniqueId = Date.now()
    const { src, title, text } = req.body;
    const data = {
        id: uniqueId,
        src: src,
        title: title,
        text: text
    };
  
    const fileContent = fs.readFileSync(storageName, 'utf8');
    currentData = JSON.parse(fileContent); 
    
    currentData.push(data);
    fs.writeFileSync(storageName, JSON.stringify(currentData, null, 2), 'utf8');
    res.send('Элемент успешно Добавлен');

});
app.delete('/stocks/delete/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);  
    let currentData = [];

    const fileContent = fs.readFileSync(storageName, 'utf8');
    currentData = JSON.parse(fileContent); 
    

    const newData = currentData.filter(item => item.id != idToDelete);

    if (newData.length == currentData.length) {
        return res.status(404).send('Элемент с таким ID не найден');
    }
    fs.writeFileSync(storageName, JSON.stringify(newData, null, 2), 'utf8');
    res.send('Элемент успешно удален');
});


app.get('/stocks/:id', (req, res) => {
    const id = req.params.id; 
    
    const numberId = Number.parseInt(id);
    if (Number.isNaN(numberId)) { 
        res.status(400).send({status: 'Bad Request', message: 'id must be number!'});
    }

    const stocks = readJson(storageName);
    const stock = stocks.find((value) => { 
        return value.id === numberId;
    });

    if (stock) { 
        res.send(stock);
    } else {
        res.status(404).send({status: 'Not Found', message: `not found stock with id ${numberId}`});
    }
});

app.listen(port, host, () => { 
    console.log(`Сервер запущен! http://${host}:${port}`);
});