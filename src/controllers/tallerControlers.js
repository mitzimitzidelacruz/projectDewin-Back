const Taller = require("../models/Taller");

exports.crearTaller = async(req, res) =>{

    try{
        let taller;
        taller = new Taller(req.body);

       await taller.save();
       res.send(taller);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTaller = async(req, res) =>{
    try{

    const talleres = await Taller.find();
    res.json(talleres)

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarTaller = async (req, res) =>{
    try{
        const {
            nombre,
            instructor,
            ubicacion,
            hora
        }= req.body;
        let taller= await Taller.findById(req.params.id);
        if(!taller){
            res.status(404).json({msg: 'No existe el taller'})
        }
        taller.nombre = nombre;
        taller.instructor = instructor;
        taller.ubicacion = ubicacion;
        taller.hora = hora;

        taller = await Taller.findByIdAndUpdate({_id: req.params.id},taller, {new: true})
        res.json(taller); 


    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTaller = async(req, res) =>{
    try{

    const talleres = await Taller.find();
    res.json(talleres)

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTaller = async (req, res) =>{
    try{

        let taller= await Taller.findById(req.params.id);
        if(!taller){
            res.status(404).json({msg: 'No existe el taller'})
        }
        
        res.json(taller); 


    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarTaller = async (req, res) =>{
    try{

        let taller= await Taller.findById(req.params.id);
        if(!taller){
            res.status(404).json({msg: 'No existe el taller'})
        }
        await Taller.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Taller eliminado con éxito'});


    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}