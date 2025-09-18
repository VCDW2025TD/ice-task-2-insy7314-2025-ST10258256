const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//This is how the documents will look
const userSchema = new mongoose.Schema({
         email:{
            type: String,
            required: true,
            unique: true
         },
          password:{
            type: String,
            required: true
         }
});


//Automatically hash the password
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Compare the plain text password with the hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);