import { Router } from "express";
import {requireLogin} from '../middleware/auth.middleware.js'
import { UserDTO } from "../dto/user.dto.js";

const router = new Router ();

router.get ('/', requireLogin, (req,res) => {
      const userData = req.session.user; // usuario completo
  const { first_name, last_name } = userData; // extraemos para el saludo

  const safeUser = new UserDTO(userData); // filtramos con DTO

    const bienvenida = `Bienvenido ${first_name} ${last_name}.!`

res.status (200).json ({message: bienvenida, user: safeUser})
})


export default router;