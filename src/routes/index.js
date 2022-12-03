const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hola mundo'))

router.post('/signup', async (req, res) => {
    const { email, password, userName, userLastName, rol } = req.body;
    const newUser = new User({ email:email, password:password, userName:userName, userLastName:userLastName, rol:rol });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')
    res.status(200).json({ token })
})

//creacion de la ruta signin
router.post('/signIn', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email})
    if (!user) return res.status(401).send("El email no existe");
    if (user.password !== password) return res.status(401).send('Contraseña erronea');
    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({ token });

});

//ruta para arreglo de tareas
router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem',
            date: "2022-10-29T23:50:28.192Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem',
            date: "2022-10-29T23:50:28.192Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem',
            date: "2022-10-29T23:50:28.192Z"
        }
    ])
})
//ruta para arreglos privados
router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem',
            date: "2022-10-29T23:50:28.192Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem',
            date: "2022-10-29T23:50:28.192Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem',
            date: "2022-10-29T23:50:28.192Z"
        }
    ])
})

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
})


module.exports = router;

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send('No estas autorizado para solicitar los datos');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Necesita la autorizacion');
    }
    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id;
    next();
}