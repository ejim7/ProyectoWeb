const express = require('express');
const acceso = require('./accesoRefugio.js');
const app = express();
const jwt = require("jsonwebtoken");
var router = express.Router();

app.listen(3000, () => {

    console.log("Servidor levantado y escuchando por el puerto 3000!");
});

app.post("/refugiado", (req, res, next) => {
    console.log(req.body);
    console.log(req.query);

    // Almacenar DB
    const refugiado = req.body;
    if (!refugiado.tipo) {

        return res.status(400).next("Campo vacio");
    }
    res.json(data);
    acceso.agregarRefugiado(data);
    res.status(200).send(data);
});

app.put("/refugiado", (req, res, next) => {
    console.log(req.body);
    console.log(req.query);
    const id = parseInt(req.query.id);

    const data = req.body;
    data.id = id;
    res.json(data);
    acceso.actualizarRefugiado(data);
    res.status(200).send(data);
});

app.delete("/refugiado/:id", (req, res, next) => {
    console.log(req.query);
    const id = parseInt(req.params['id']);
    const data = req.body;

    data.id = id;
    res.json(data);
    if (!id) {
        return res.status(400).next("Campo invalido");
    }
    acceso.eliminarRefugiado(id);
    res.status(200).send(data);
});

app.get("/refugiado", (req, res, next) => {
    console.log(req.query);
    const id = parseInt(req.query.id);
    const data = req.body;
    data.id = id;
    res.json(data);

    if (!id) {
        return res.status(400).next("Campo invalido");
    }
    acceso.obtenerTodosAdoptados();
    res.send(200).send(data);
});

////////////////////////////////////////////

app.post("/adopcion", async (req, res, next) => {
    console.log(req.body);

    // Almacenar DB
    const adopcion = req.body;
    if (!adopcion.fecha) {

        return res.status(400).next("Campo invalido");
    }
    var animal = {
        nombre: adopcion.nombre,
        id: adopcion.id
    };
    res.json(adopcion);
    await acceso.agregarAdopcion(animal, adopcion.fecha);

    res.status(200).send(adopcion);
});

app.get("/adopcion", async (req, res, next) => {

    const data = req.body;
    data.id = id;
    res.json(data);

    await acceso.obtenerTodosAdoptados();
    res.send(200).send(data);
});

////////////////////////////////////////////

app.post("/atencion", async (req, res, next) => {
    console.log(req.body);

    // Almacenar DB
    const atencion = req.body;

    if (!atencion.id) {
        return res.status(400).next("Campo invalido");
    }
    var animal = {
        nombre: atencion.nombre,
        id: atencion.id
    };

    res.json(atencion);
    await acceso.agregarAdopcion(animal, atencion.encargado, atencion.info);

    res.status(200).send(atencion);
});

app.get("/atencion", async (req, res, next) => {

    const data = req.body;
    res.json(data);

    await acceso.obtenerTodosAtendidos();
    res.send(200).send(data);
});
////////////////////////////////////////////

/////JWT////
app.post('/login', (req, res) => {

    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next();
    })
}

function generarToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
////////////////////////////////////////////
app.use((err, req, res, next) => {

    res.sendStatus(err.httpStatusCode).json(err);

})