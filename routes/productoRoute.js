const { Router } = require('express');
const { check } = require('express-validator');
const { productoGET,
        productoPOST,
        productoPUT }  = require('../controllers/productoController');

const router = Router();

router.get('/', productoGET);

router.post('/', [
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty()

], productoPOST);

router.put('/:id', productoPUT); 

module.exports = router;