const { Router }     = require('express');
const { check }      = require('express-validator');
const { carritoGET, 
        carritoPOST,
        carritoPUT } = require('../controllers/carritoController');

const router = Router();

router.get('/', carritoGET);

router.post('/', carritoPOST);

router.put('/:id', carritoPUT);

module.exports = router;