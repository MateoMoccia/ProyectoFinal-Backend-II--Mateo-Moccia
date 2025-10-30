import nodemailer from 'nodemailer'
import express from 'express'

const app = express ();

export const enviarMailNodemailer = async (email, first_name, html) => { // Define la función que enviará el correo
  const contenido = html ||                                              // Si no se pasa HTML, crea un mensaje base
  `
  ¡Hola ${first_name}!
  Has solicitado restablecer tu contraseña.
  `;

  const transporter = nodemailer.createTransport({                      
    service: "gmail",                                                    
    auth: {
      user: process.env.GMAIL_USER,                                      // Usuario Gmail guardado en .env
      pass: process.env.GMAIL_PASS,                                      // Contraseña o token de aplicación
    },
  });

  const mailOptions = {                                                 
    from: process.env.GMAIL_USER,                                        // Emisor
    to: email,                                                           // Destinatario
    subject: "Recuperación de contraseña",                               // Asunto del correo
    html: contenido,                                                     // Cuerpo del correo (HTML o texto)
  };

  try {
    await transporter.sendMail(mailOptions);                             // Envía el correo
    console.log("Correo enviado con éxito");                             // Confirma envío correcto
    return true;                                                         // Devuelve éxito
  } catch (error) {
    console.error("Error completo al enviar el correo:", error);         // Muestra el error completo
    return false;                                                        // Devuelve fallo
  }
};