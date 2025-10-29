export class UserDTO {
  constructor(user) { // Recibe un objeto user (por ejemplo, de la sesión o del DAO)
    this.first_name = user.first_name; // Muestra el nombre
    this.last_name = user.last_name;   // Muestra el apellido
    this.email = user.email;           // Muestra el correo
    this.age = user.age;               // Muestra la edad
    this.role = user.role || "user";   // Si no hay rol definido, asigna "user" por defecto
    // No se incluye password, _id ni otros campos sensibles
  }
}