const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//generando el Schema userSchema (collection)
const userSchema = new Schema ({ 
    username: {type: String, require: true, unique: true},
    password: { type: String, require: true }
 });

 //generando el modelo User (DB)
 const User = mongoose.model('User', userSchema);

 module.exports = User;

