const {response, request} = require('express');
const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const imgPOST = async(req, res = response ) => {
    const extensionesValidas = ['jpg', 'jpeg', 'gif', 'png'];

    try{
        const { archivo } = req.files;
        //validacion de extencion
         const nombreCortado = archivo.name.split('.');
         const extension = nombreCortado[ nombreCortado.length - 1]
            if(!extensionesValidas.includes(extension)){
                console.log(`La extension ${extension} no es permitida`);
            }
        
         const nombreTemporal = shortid.generate() + '.' + extension; 
         const { secure_url } = await cloudinary.uploader.upload(archivo.tempFilePath, { folder: "/shopping" }  ); 
        
        res.status(200).json({
            archivo: nombreTemporal,
            ruta: secure_url
        })

    }catch(error){
        res.status(500).json({
            msg: 'Existe un error en el servidor'
        })
    }

}

module.exports = {
    imgPOST
}