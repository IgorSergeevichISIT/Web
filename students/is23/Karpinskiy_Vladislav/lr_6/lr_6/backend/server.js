const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 8000

const DB_FILE = path.join(__dirname, 'db', 'base.json')

app.use(cors())
app.use(express.json())

function readDB() {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
    } catch (e) {
        return []
    }
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

app.get('/api/items', (req, res) => {
    res.send(readDB())
})

app.get('/api/items/:id', (req, res) => {
    const item = readDB().find(i => i.id == req.params.id)

    if (!item) {
        return res.status(404).send({ error: 'Not found' })
    }

    res.send(item)
})

app.post('/api/items', (req, res) => {
    const items = readDB()

    const newItem = {
        id: Date.now(),
        ...req.body
    }

    items.push(newItem)
    writeDB(items)

    res.send(newItem)
})

app.delete('/api/items/:id', (req, res) => {
    const id = Number(req.params.id)

    let items = readDB().filter(i => i.id !== id)

    writeDB(items)

    res.send({ success: true })
})

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
})