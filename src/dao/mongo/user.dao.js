import { User } from "../../config/models/user.model.js";   // Se importa el modelo User definido con Mongoose para usarlo en las consultas

export class UserDAO {                                     // Se define una clase que centraliza el acceso a datos de usuarios

  async getAll() {                                         // Método para obtener todos los usuarios
    return await User.find();                              // Usa Mongoose para traer todos los documentos de la colección 'users'
  }                                                        // Devuelve un array con los usuarios

  async getByEmail(email) {                                // Método para buscar un usuario por su email
    return await User.findOne({ email });                  // Busca el primer usuario que tenga ese email (o null si no existe)
  }                                                        // Muy usado en login o validaciones de registro

  async create(userData) {                                 // Método para crear un nuevo usuario
    const user = new User(userData);                       // Se crea una instancia del modelo User con los datos recibidos
    return await user.save();                              // Se guarda el nuevo usuario en MongoDB y se devuelve el documento guardado
  }

  async updatePassword(email, newHashedPassword) {         // Método para actualizar la contraseña de un usuario existente
    return await User.updateOne(                           // Busca por email y reemplaza el campo 'password'
      { email },                                           // Condición de búsqueda: usuario con este email
      { password: newHashedPassword }                      // Nuevo valor de la contraseña (ya encriptada)
    );                                                     // Devuelve información del resultado de la operación (nº de documentos modificados)
  }
  
async getById (id) {
  return await User.findById (id)
}

  async deleteById(id) {                                   // Método para eliminar un usuario por ID
    return await User.findByIdAndDelete(id);               // Borra el documento y devuelve el usuario eliminado o null si no existía
  }


}
