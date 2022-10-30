const{Schema,model} = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    userName: String,
    userLastName: String
},
{
    timestamps:true
}

);

module.exports = model('User', userSchema);
