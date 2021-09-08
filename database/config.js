const mongoose = require('mongoose');

const dbconexion = async () => {
    
    try {
        await mongoose.connect( process.env.CONEXION_SHOPPING_BACK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Base de datos conectada");
   
    } catch (error) {
        console.log(error);
        throw new Error('SUCCEDIO UN ERROR');
    }
}

module.exports = {
    dbconexion
}