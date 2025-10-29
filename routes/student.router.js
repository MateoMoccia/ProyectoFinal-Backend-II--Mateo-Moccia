import { Router } from "express";
import { Student } from "../config/models/student.model.js";
import mongoose from "mongoose";
const router = Router ();

router.get ('/',async (req,res)=> {
    try {
        const students = await Student.find ();
    res.status (200).json ({"students": students})
    } catch (error) {
res.status (500).json ({error:error.message})   
 }
})

router.post ('/',async (req,res)=> {
    try {
        const {name,email,age} = req.body;
        if (!name || !email || !age){
            res.status (400).json ({error: "Todos los datos son requeridos"})
        };
        const student = new Student ({name,email,age})
        await student.save();

    res.status (201).json ({ "message": "Estudiante creado con exito.!!","student": student})
    } catch (error) {
res.status (500).json ({error:error.message})   
 }
})

router.get ('/:id',async (req,res)=> {
    try {

if (!mongoose.Types.ObjectId.isValid (req.params.id)) {
    return res.status (400).json ({error: "Error ID invalido/formato invalido"})
}
        const student = await Student.findByIdAndUpdate (req.params.id, req.body, {
            new: true,
            runValidators: true
        });

if (!student)
    return res.status (404).json ({error: "El usuario no existe!!"})

    res.status (200).json ({message: "Estudiante actualizado con exito","student": student})
    } catch (error) {
res.status (500).json ({error:error.message})   
 }
})

router.delete ('/:id',async (req,res)=> {
    try {

if (!mongoose.Types.ObjectId.isValid (req.params.id)) {
    return res.status (400).json ({error: "Error ID invalido/formato invalido"})
}
        const student = await Student.findByIdAndDelete(req.params.id);

if (!student)
    return res.status (404).json ({error: "El usuario no existe!!"})

    res.status (204).json ();
    
    } catch (error) {
res.status (500).json ({error:error.message})   
 }
})

export default router;