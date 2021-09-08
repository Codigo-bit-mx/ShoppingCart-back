const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    
    id:{
        type: String,
        require: [true, 'Se requiere el id']
    },
    nombre: {
        type: String,
        require: [true, 'El nombre se requiere']
    },
    categoria: {
        type: String,
        require: [true, 'La categoria se requiere']
    },
    descripcion: {
        type: String,
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    ruta: {
        type: String,
        require: [true, 'La ruta se requiere']
    },
    ventas: {
        type: Number,
        default: 0
    }
});

module.exports = model('Producto',  ProductoSchema); 