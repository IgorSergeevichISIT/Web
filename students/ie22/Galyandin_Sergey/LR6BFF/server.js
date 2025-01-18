import express, { json } from 'express';
import cors from 'cors';
import router from './routes/router.js';
const port = 8000;
const app = express();

app.use(cors())
app.use(json());
app.use("/vk-api", router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});