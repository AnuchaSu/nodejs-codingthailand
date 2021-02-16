var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var schema = new mongoose.Schema({
  name: {type:String,required:true,trim:true},
  email:{type:String,required:true,trim:true,unique:true,index:true},
  password:{type:String,required:true,trim:true,minlength:3},
  role:{type:String,default:'member'}
});

schema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password,salt)
    return hashPassword;
}

schema.methods.checkPassword = async function(password){
  const valid = await bcrypt.compare(password,this.password);
  return valid;
}


const user = mongoose.model("users", schema);

module.exports = user;