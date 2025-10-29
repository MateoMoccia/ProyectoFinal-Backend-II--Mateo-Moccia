import { Router } from "express";

const router = Router ();

router.get('/',(req,res)=> {
    res.status (200).json ({message: "Hola a todos, servidor funcionando perfectamente backend2"})
})

export default router;