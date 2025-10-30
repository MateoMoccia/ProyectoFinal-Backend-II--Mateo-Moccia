import { Product } from "../../config/models/product.model.js";     // Importa el modelo Product desde Mongoose

export class ProductDAO {                                           // Define la clase ProductDAO (Data Access Object)

  async getAll() {                                                  // Método: obtener todos los productos
    return await Product.find();                                    // Usa Mongoose para traer todos los documentos de la colección "products"
  }

  async create(productData) {                                       // Método: crear un nuevo producto
    const product = new Product(productData);                       // Crea una instancia del modelo con los datos recibidos
    return await product.save();                                    // Guarda el nuevo producto en la base de datos
  }

  async getById(id) {                                               // Método: obtener un producto por su ID
    return await Product.findById(id);                              // Busca el documento por ID y lo devuelve (o null si no existe)
  }

  async deleteById(id) {                                            // Método: eliminar un producto por su ID
    return await Product.findByIdAndDelete(id);                     // Elimina el producto con ese ID y devuelve el documento eliminado
  }

  async updateById(id, updates) {                                   // Método: actualizar un producto por su ID
    return await Product.findByIdAndUpdate(id, updates, { new: true }); // Actualiza con los nuevos datos y devuelve el producto actualizado
  }
}
