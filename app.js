import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const url = "http://www.raydelto.org/agenda.php";
let contactos = [];

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

fetch(url)
.then(e => e.json())
.then(content => contactos = content);

app.post('/contactos', (request, res) => {
    const contact = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        telefono: request.body.telefono
    }

    axios.post(url, contact).then(response => {
        console.log("Guardado correctamente");
    })

    contactos.push(contact)

    const response = {
        data: contact,
        message: 'Contacto agregado exitosamente'
    }

    res.send(response)
})

app.get('/contactos', (request, res) => {

    fetch(url)
    .then(e => e.json())
    .then(content => contactos = content);

    const response = {
        data: contactos
    }

    res.send(response)
})


const puerto = 8080;
console.log(`Estoy escuchando en el puerto ${puerto}`);
app.listen(puerto);