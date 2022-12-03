const { Schema, model } = require('mongoose');

const TallerSchema = new Schema({
    nombre: String,
    instructor: String,
    ubicacion: String,
    hora: Number

},
    {
        timestamps: true
    }

);

module.exports = model('Taller', TallerSchema);
