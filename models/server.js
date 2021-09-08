const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbconexion } = require('../database/config');

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.productosPath = '/api/productos';
        this.imgPath = '/api/img';
        this.carritoPath = '/api/carrito';
        this.conectarBD();
        this.middleware();
        this.routes();
    }

    //conexion a la BD
    async conectarBD(){
        await dbconexion();
    }

    middleware () {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public'));   
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    //Rutas
    routes(){
        this.app.use( this.productosPath, require('../routes/productoRoute'));   
        this.app.use( this.imgPath, require('../routes/imgRoute'));
        this.app.use( this.carritoPath, require('../routes/carritoRoute'));
    }

    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log('servidor corriendo', process.env.PORT);
        })
    }
}

module.exports = Server;