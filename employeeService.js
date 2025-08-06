import fs from 'fs';
import csv from 'csv-parser';
import db from './db.js';

export const cargarCsv = (rutaCsv) =>{
    fs.createReadStream(rutaCsv)
    .pipe(csv()) //parsea cada fila
    .on('data', (row) =>{ //se activa cada vez que se procesa una fila
        const {name,lastname,lastname2,email,charge,city,salary,age} = row; // propiedades que van en las filas y las separa por ,
        const insertQuery = `
            INSERT INTO employees(name, lastname, lastname2, email, charge, city, salary, age)
            VALUES(?,?,?,?,?,?,?,?)
        `;
        db.query(
            insertQuery,
            [name, lastname, lastname2, email, charge, city, salary, age],
            (err, result) => {
                if (err) {
                    console.error('Error insertando fila',err.message);
                } else{
                    console.log('Se logoro insertar');
                }
            }
        )   
    })
    .on('end', () =>{
        console.log("La sesión se ha cerrado correctamente")
    })
}

