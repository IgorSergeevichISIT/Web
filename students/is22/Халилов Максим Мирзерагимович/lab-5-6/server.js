import express from 'express';
import pkg from 'pg';  // Import pg as a whole package
const { Pool } = pkg;  // Destructure Pool from the imported package
import { ajax } from './modules/ajax.js';
import { urls } from './modules/urls.js';
import fs from 'fs/promises';  // Используем промисы для работы с файловой системой

const app = express();
const port = urls.getLocalServer()[1];
const jsonFilePath = './groupMembers.json';  

// Use express's built-in JSON parser middleware
app.use(express.json());

let isWriting = false;

// PostgreSQL connection setup
const pool = new Pool({
    user: 'user',
    host: 'localhost', // Ensure the port matches
    database: 'mydatabase',
    password: 'password',
    port: 5432, // PostgreSQL port
});
  
// Endpoint for adding data
app.get('/add-data/:name/:fname', async (req, res) => {
    const name = req.params.name;
    const fname = req.params.fname;

    try {
        const result = await pool.query('INSERT INTO name_data (name_data) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
});

// Other routes...

// Start the server
app.listen(port, () => {
    console.log(`Server running on ${urls.getLocalServer()[0]}`);
});
