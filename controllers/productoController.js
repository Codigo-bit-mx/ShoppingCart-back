const { response, request } = require('express');
const Producto = require('../models/modProducto');
const { validationResult } = require('express-validator');
const shortid = require('shortid');

const productoGET = async(req, res) => {
    
    try{
        const productos = await Producto.find();
        res.status(200).json({productos});
    }catch(error){
        console.log(error);
        res.status(400).send({msg: 'Este endpoint esta fallando'})
    }
}


const productoPOST = async(req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //datos sobre el carrito
    const{nombre, descripcion, ruta, categoria} = req.body;
    const producto =  new Producto();
    producto.id = shortid.generate();
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.ruta = ruta;
    producto.categoria = categoria;
      
    try{
        await producto.save();
        return res.status(200).json({msg: 'exito se subio el producto'})
    }catch(error){
        console.log(error);
        res.status(400).send({msg: 'esta fallando este endpoint'})
    }
}

const productoPUT = async (req, res) => {

    const { id } = req.params;
    const { ventas } = req.body;
    
    try{
        let existeElProducto = await Producto.findById(id);
        if(!existeElProducto) {
            res.status(400).send({msg: 'no existe el producto'});
        }

        const dato = {
            ventas : ventas
        }; 
        existeElProducto = await Producto.findByIdAndUpdate(id, dato, {new: true});
        res.status(200).json({existeElProducto});

    }catch(error){    
      res.status(400).send({msg: "este endpoint esta fallando"});
    }
}



module.exports = {  
    productoGET,
    productoPOST,
    productoPUT
}

