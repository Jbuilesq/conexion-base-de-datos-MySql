import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { cargarCsv } from './employeeService.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3001;

app.use(cors())

app.post('/subir-archivo', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path;

    cargarCsv(filePath);

    res.json({ message: 'Archivo recibidoy y procesando.'})
})

app.listen(PORT, () => {
    console.log('conectao')
})