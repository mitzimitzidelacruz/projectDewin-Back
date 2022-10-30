const {Router} = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req,res) => res.send('Hola mundo'))

router.post('/signup', async (req, res) => {
    const{ email, password }=req.body;

const newUser = new User({email,  password});

await newUser.save();

const token = jwt.sign({_id: newUser._id}, 'secretKey' )

res.status(200).json({token})
})

//creacion de la ruta signin
router.post('/signIn', async(req, res) =>
{
const {email, password} = req.body;

const user = await User.findOne({email})

if(!user) return res.status(401).send("El email no existe");
if(user.password !== password) return res.status(401).send('Contraseña erronea');

const token = jwt.sign({_id: user._id}, 'secretKey');
return res.status(200).json({token});

});

//ruta para arreglo de tareas


module.exports = router;