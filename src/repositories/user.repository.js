import { UserDAO } from "../dao/mongo/user.dao.js";           
import bcrypt from "bcrypt";                                  

const userDAO = new UserDAO();                               

export class UserRepository {    

/////////////////////////////////////////////////////////////////////////////

  async createUser(userData) {                                // Crea un nuevo usuario
  
    const existingUser = await userDAO.getByEmail(userData.email); 

    if (existingUser) {                                       
      throw new Error("El correo ya está registrado");       
    }

    userData.password = await bcrypt.hash(userData.password, 10); // Hashea la contraseña antes de guardarla

    const newUser = await userDAO.create(userData);           
    return newUser;                                          
  }

/////////////////////////////////////////////////////////////////////////////

  async getUserByEmail(email) {                               // Busca usuario por email
    return await userDAO.getByEmail(email);                   
  }
/////////////////////////////////////////////////////////////////////////////

  async updateUserPassword(email, newPassword) {              // Actualiza la contraseña de un usuario
    const user = await this.getUserByEmail(email);           

    if (!user) {                                              
      throw new Error("Este mail no ha sido encontrado");     
    } else {
      await userDAO.updatePassword(email, newPassword);       
    }

    return { message: "Contraseña actualizada correctamente" }; 
  }
/////////////////////////////////////////////////////////////////////////////

  async deleteUserById(id) {                                  // Elimina un usuario por ID
    const verifyUser = await userDAO.getById(id);             

    if (!verifyUser) {                                        
      throw new Error("Este mail no ha sido encontrado");     
    } else {
      await userDAO.deleteById(id);                           
    }

    return { message: "El usuario ha sido eliminado con éxito" }; 
  }
}


