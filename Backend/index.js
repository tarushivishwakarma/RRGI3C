const express1 = require('express')
const mongoose = require('mongoose')
const Bharath = require('./studentModel')
const app = express1()
app.use(express1.json())

mongoose.connect('mongodb://localhost:27017/Rrgi')
.then(()=>console.log("Data BAse Connected"))
.catch((err)=>console.log(err))

app.post("/addstudent",async(req,res)=>{
    try {
        const studentdata = await Bharath.create(req.body)
        res.status(201).json({message:"Data Saved Scuceesfully" ,studentdata})
    } catch (error) {
        res.status(400).json(error)
    }

})

app.get("/getstudents",async(req,res)=>{
    try {
        const getsData = await Bharath.find({})
        res.status(200).json({message:"Data Fetch Sucessfull", getsData})
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get("/getStudent/:studentId",async(req,res)=>{
    try {
        const student = await Bharath.findById(req.params.studentId)
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json(error)
    }

})

app.put("/student/:id",async(req,res)=>{
try {
    const student = await Bharath.findByIdAndUpdate(
        req.params.id,
        req.body ,
        {new:true}
    )
    res.status(200).json(student)
} catch (error) {
    res.status(400).json(error)
}
})

app.delete("/deletestudent/:id",async(req,res)=>{
try {
    const student = await Bharath.findByIdAndDelete(req.params.id)
    res.status(200).json("Studnet Deleted Sucesfully")
} catch (error) {
     res.status(400).json(error)
}
})



app.listen(4500,()=>{
console.log("Server Sterted")
})