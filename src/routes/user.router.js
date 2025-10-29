import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../config/models/user.model.js";
import bcrypt from 'bcrypt';
import {requireLogin, alreadyLogin} from '../middleware/auth.middleware.js'

const router = new Router ();

router.post ('/register',alreadyLogin,  async (req,res) => {
    try {
const {first_name, last_name, email, age, password} = req.body
if (!first_name || !last_name || !email || !password) {
    return res.status(400).json ({error: "Todos los datos son requeridos!!"})
}

const exist = await User.findOne ({email});
if (exist) return res.status (400).json ({error: "Este mail ya se encuentra registrado"})
   const hash = await bcrypt.hash (password, 10); //Encriptar la contrasena (hasheada)

const user = new User ({first_name, last_name, email, age, password: hash})

await user.save ();

res.status (201).json ({message: "Usuario creado con exito", user: user})
} 
    catch (error) {
        console.error(error);
        res.status (500).json ({error: error.message});
        
    }
})

router.post ('/login', alreadyLogin, async (req,res) => {
    try {
const {email, password} = req.body
const user = await User.findOne ({email});
if (!user) return res.status (404).json ({error:"Este usuario no fue encontrado"});
 
const valid = await bcrypt.compare (password, user.password);
if (!valid) return res.status (400).json ({error: "La contrasena es incorrecta"})

req.session.user = { //PEDIRLE A CHAT GPT QUE TE EXPLIQUE EL CONTEXTO DE ESTE REQ// CREO YO QUE ES EL GUARDADO DE LOS DATOS DE LA SESION MENOS EL PASSWORD QUE NO SE GUARDA NUNCA!
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age
};

res.status (200).json ({message: "Login exitoso", user: req.session.user})

     }catch (error) {
        console.error(error);
        res.status (500).json ({error: error.message});
    }
})


router.post ('/logout', requireLogin, async (req,res) => {
    req.session.destroy (() => {
        res.status (200).json ({message: "La sesion se ha cerrado correctamente (logout)"})
    })
})

router.get ('/',requireLogin, async (req,res) => {
    try {
const users = await User.find ();
res.status (200).json ({users: users});

    }catch (error) {
console.error(error);
res.status (500).json ({error: error.message})

    }
})









export default router;