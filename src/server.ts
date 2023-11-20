import "reflect-metadata"
import express from 'express';
import { createProduct, deleteProduct, getAllProducts } from './controllers/ProductController';
import { DataSource } from "typeorm";

const cors = require('cors');

export const connection = new DataSource({
    "type": "sqlite",
    "database": "src/data/database.sqlite",
    "logging": false,
    "entities": ["src/models/**/*.ts"]
});
connection.initialize()
    .then(() => { })
    .catch((error) => console.log(error))

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/products', getAllProducts);
app.post('/products', createProduct);
app.delete('/products/:id/delete', deleteProduct);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});