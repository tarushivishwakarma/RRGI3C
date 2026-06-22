const mongoose1 = require('mongoose')
const studentSchema = new mongoose1.Schema({
    name:String,
    email:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose1.model("Students" , studentSchema)