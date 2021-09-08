const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({

    id: {
        type: String
    },
    nombre: {
        type: String
    },
    productos: {
      type: Array
    },
    creado: {
        type: String,
    },
    completado: {
        type: Boolean,
        default: false  
    }

    
});

module.exports = model('Carrito', CarritoSchema);