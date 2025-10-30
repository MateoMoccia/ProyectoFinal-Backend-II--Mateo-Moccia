export function authorize(rolesPermitidos) {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) {
     return res.status(400).json({ error: "No autenticado" });
    }
    
      const userRole = user.role;
 

  if (!rolesPermitidos.includes (userRole) ) {
return res.status (403).json ({error: "No autorizado"})
  }

  next ()
}}
