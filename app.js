import {cargarCsv} from './employeeService.js';
import db from './db.js';
import express from 'express'

const app = express();
app.use(express.json());

const archivo = 'empleados.csv';

// cargarCsv(archivo);

app.post('/employee', async (req ,result)=>{
    const datos = req.body;
      if (!datos) {
        return res.status(400).json({ error: 'No se enviaron datos' });
    }
    const query = `
            INSERT INTO employees(name, lastname, lastname2, email, charge, city, salary, age)
            VALUES(?,?,?,?,?,?,?,?)`;

    const valores =[
        datos.name,
        datos.lastname,
        datos.lastname2,
        datos.email,
        datos.charge,
        datos.city,
        datos.salary,
        datos.age
    ];
    db.query(query , valores, (err,res)=>{
       
        if (err) {
            console.error("Error al insertar",err.message);
            return
        }
        result.status(201).json({

            id: res.idEployee
        })
    });
});

app.listen(3000, () =>{
    console.log("Puerto corriendo por http://localhost:3000");
});