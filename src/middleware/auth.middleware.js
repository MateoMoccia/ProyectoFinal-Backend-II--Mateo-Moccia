export function requireLogin (req,res, next) {
    if (!req.session.user) {
        return res.status (401).json ({error: "No autorizado"})
    }
    next ();
}

export function alreadyLogin (req,res,next) {
    if (req.session.user) {
        return res.status (403).json ({error: "Este usuario ya se encuentra logeado!!"})
    }
    next ();
}

//PEDIRLE A CHAT GPT QUE TE EXPLIQUE MEJOR LOS MIDDLEWARE UTILIZANDO A ESTOS 2 COMO EJEMPLOS 
// Y QUE TAMBIEN TE EXPLIQUE EL DE LOGGER.MIDDLEWARE.JS