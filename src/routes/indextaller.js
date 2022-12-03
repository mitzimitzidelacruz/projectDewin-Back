const express = require('express');
const router = express.Router();
const tallerControler = require('../controllers/tallerControlers');

router.post('/taller',tallerControler.crearTaller);
router.get('/taller',tallerControler.obtenerTaller);
router.put('/taller/:id',tallerControler.actualizarTaller);
router.get('/taller/:id',tallerControler.obtenerTaller);
router.delete('/taller/:id',tallerControler.eliminarTaller);


module.exports = router;