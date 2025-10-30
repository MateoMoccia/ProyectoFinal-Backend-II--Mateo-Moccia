import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { enviarMailNodemailer } from '../utils/mailing.js';
import { UserRepository } from '../repositories/user.repository.js';

const app = express ();
const router = Router ();
const userRepository = new UserRepository ()

//////////////////////////////////////////////////////////////////////////////
router.post ('/forgot-password', async (req,res) => {
    try {
const email = req.body.email

 const user = await userRepository.getUserByEmail (email)

 if (!user) {
    return res.status (404).json ({error: "Usuario no encontrado"})
 }

 const token = jwt.sign ({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
    
const resetLink = `http://localhost:8080/reset-password/${token}`

const contenido = `Hola ${user.first_name}, Hace click aqui para recuperar tu contraseña ${resetLink}`

 const enviado = await enviarMailNodemailer (email, user.first_name, contenido) 

 if (enviado === true) {
    return res.status(200).json({ message: "Correo de recuperación enviado correctamente" });
 } 

 if (enviado === false) {
    return res.status (500).json ({message: "Error al enviar el correo"})
 }

}catch (error) {
        console.error(error);
        res.status (500).json ({error: error.message});
    }
}) 

///////////////////////////////////////////////////////////////////////////////
router.post ('/reset-password/:token', async (req,res) => {
    try {

const tokenObtenido = req.params.token 

const verify = jwt.verify (tokenObtenido,process.env.JWT_SECRET)

const {newPassword} = req.body

const email = verify.email

 const user = await userRepository.getUserByEmail (email)

 if (!user) {
    return res.status (404).json ({error: "Usuario no encontrado"})
 }

const comparePasswords = bcrypt.compareSync (newPassword, user.password) 

if (comparePasswords === true) {
    return res.status (400).json ({error: "Error, no puedes poner la misma contrasena"})
}
else if (comparePasswords === false) {
    const hashedPassword = await bcrypt.hash (newPassword,10)

    await userRepository.updateUserPassword (email,hashedPassword)

    res.status (200).json ({message: "Tu contrasena ha sido actualizada correctamente"})
}
     }catch (error) {
        console.error(error);
        res.status (500).json ({error: error.message});
    }
}) 