import { UserDAO } from "../dao/mongo/user.dao.js";

const userDAO = new UserDAO ();

export class UserRepository {


async createUser (userData) {
const existingUser = await userDAO.getByEmail (userData.email)

if (existingUser) {
    throw new Error ("El correo ya esta registrado")
}
const newUser = await userDAO.create(userData)
return newUser
}

async getUserByEmail (email) {
    return await userDAO.getByEmail (email)
}

async updateUserPassword (email, newPassword) {
  
   const user = await this.getUserByEmail (email)

if (!user) {
     throw new Error ("Este mail no ha sido encontrado")
}
else  {
     await userDAO.updatePassword (email, newPassword)
}
return {message: "Contrasena actualizada correctamente "}
}

async deleteUserById (id) {
    const verifyUser = await userDAO.getById (id)
    
    if (!verifyUser) {
        throw new Error ("Este mail no ha sido encontrado")
    }
    else  {
        await userDAO.deleteById (id)
    }
    return {message: "El usuario ha sido eliminado con exito"}
}
}