import { Router } from "express";

import {requireLogin} from '../middleware/auth.middleware.js'

const router = new Router ();

router.get ('/', requireLogin, (req,res) => {
    const {first_name, last_name, email, age } = req.session.user;

    const bienvenida = `Bienvenido ${first_name} ${last_name}.!`

res.status (200).json ({message: bienvenida, user: first_name, last_name, email, age})
})


export default router;