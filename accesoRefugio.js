const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sesamo',
    database: 'refugio',
});

let refugiado = {
    id: 11,
    tipo: "Roedor",
    descripcion: "Sano",
    llegada: "18/21/2011",
    nombre: "Manji"
};

let atencion = {
    id: 0,
    encargado: "",
    informacion: "",
    nombre: ""
};

let adoptado = {
    id: 0,
    fecha: "",
    nombre: ""
};

////////////////////////Refugiados////////////////////////////////
function agregarRefugiado(refugiado) {
    qry = "INSERT refugiados SET nombre = '" + refugiado.nombre + "'";
    qry = qry + ", tipo = '" + refugiado.tipo + "'";
    qry = qry + ", descripcion = '" + refugiado.descripcion + "'";
    qry = qry + ", llegada = '" + refugiado.llegada + "';";

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.end((err) => {
                console.log(err);
            });
        });
    });
}

function eliminarRefugiado(id) {
    qry = "DELETE FROM refugiados WHERE id =" + id + ";";
    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.end((err) => {
                console.log(err);
            });
        });
    });
}

function actualizarRefugiado(refugiado) {

    qry = "UPDATE `refugio`.`refugiados` SET `nombre` = '" + refugiado.nombre + "'";
    qry = qry + ", `tipo` = '" + refugiado.tipo + "'";
    qry = qry + ", `descripcion` = '" + refugiado.descripcion + "'";
    qry = qry + ", `llegada` = '" + refugiado.llegada + "'";
    qry = qry + "WHERE (`id` = '" + refugiado.id + "');"

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.end((err) => {
                console.log(err);
            });
        });
    });
}

function obtenerTodosRefugiados() {
    qry = "SELECT * FROM refugio.refugiados;";

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(result);
            conn.end((err) => {
                console.log(err);
            });
        });

    });
}
//////////////////////////Adoptado//////////////////////////////
function agregarAdopcion(refugiado, fecha) {
    qry = "INSERT adoptados SET nombre = '" + refugiado.nombre + "'";
    qry = qry + ", id = '" + refugiado.id + "'";
    qry = qry + ", fecha = '" + fecha + "';";

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.end((err) => {
                console.log(err);
            });
        });
    });
}
function obtenerTodosAdoptados() {
    qry = "SELECT * FROM refugio.adoptados;";

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(result);
            conn.end((err) => {
                console.log(err);
            });
        });

    });
}
////////////////////////Atencion////////////////////////////////
function agregarAtencion(refugiado, encargado, info) {
    qry = "INSERT atencion SET id = '" + refugiado.id + "'";
    qry = qry + ", nombre = '" + refugiado.nombre + "'";
    qry = qry + ", informacion = '" + info + "'";
    qry = qry + ", encargado = '" + encargado + "';";

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            conn.end((err) => {
                console.log(err);
            });
        });
    });
}

function obtenerTodosAtendidos() {
    qry = "SELECT * FROM refugio.atencion;";

    conn.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(qry, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(result);
            conn.end((err) => {
                console.log(err);
            });
        });

    });
}
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////