const { response, request } = require('express');
const Carrito = require('../models/modCarrito');
const {validationResult} = require('express-validator')
const shortid = require('shortid');
const  moment = require('moment');

const carritoGET = async (req, res) => {
    try{
        const resultado = await Carrito.find()
        res.status(200).json({
            resultado
        })
    
    }catch(error){
        console.log(error)
    }
}

const carritoPOST = async(req, res) => {
    // console.log("soy el carrito api")
    const datos = req.body;
    const {id, nombre, productos} = datos;
    const carrito = new Carrito();'-'
    carrito.id = shortid.generate();
    carrito.nombre = nombre;
    carrito.productos = productos;
    carrito.creado = moment().format('ll');

    try {
        await carrito.save()
        return res.status(200).json({
            msg: 'fue un exito bebe'
        })

    }catch(error){
        console.log(error);
        res.status(400).send({msg: 'Este endpoint esta fallando' });
    }

}


const carritoPUT = async (req, res) => {
    const {id} = req.params;
    const { completado } = req.body;
    try{
        let listaExiste = await Carrito.findById(id);
        if(!listaExiste) {
            res.status(400).json({msg: 'La lista no existe'});
        }
        const datos =  {}
        datos.completado = completado;
        listaExiste = await Carrito.findByIdAndUpdate(id, datos, {new:true});
        res.status(200).json({listaExiste});

    }catch(error){
        console.log(error)
    }
}

module.exports = {
    carritoGET,
    carritoPOST,
    carritoPUT
}