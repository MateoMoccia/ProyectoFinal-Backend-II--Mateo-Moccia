import { ProductDAO } from "../dao/mongo/product.dao.js";              // Importa el DAO de productos para acceder a la base de datos

const productDAO = new ProductDAO();                                   // Crea una instancia del DAO para usar sus métodos

export class ProductRepository {                                       // Define la clase ProductRepository (capa de lógica de negocio)

  async getAllProducts() {                                             // Método: obtener todos los productos
    return await productDAO.getAll();                                  // Llama directamente al DAO para traer todos los productos
  }

  //////////////////////////////////////////////////////////////

  async getProductById(id) {                                           // Método: obtener producto por ID
    const productById = await productDAO.getById(id);                  // Espera el resultado de la búsqueda por ID en el DAO
    if (!productById) {                                                // Si no existe ningún producto con ese ID...
      throw new Error("Producto no encontrado");                       // Lanza un error
    }
    return productById;                                                // Si existe, devuelve el producto encontrado
  }

  //////////////////////////////////////////////////////////////

  async createProduct(productData) {                                   // Método: crear un nuevo producto
    // Validación de campos obligatorios
    if (
      !productData.title ||                                            // Verifica que el título exista
      !productData.description ||                                      // Verifica que la descripción exista
      !productData.price ||                                            // Verifica que el precio exista
      !productData.stock ||                                            // Verifica que el stock exista
      !productData.code ||                                             // Verifica que el código exista
      !productData.category                                            // Verifica que la categoría exista
    ) {
      throw new Error("Faltan campos obligatorios");                   // Si falta alguno, lanza error
    }

    return await productDAO.create(productData);                       // Si todo está bien, llama al DAO para crear el producto
  }

  //////////////////////////////////////////////////////////////

  async updateProduct(id, updates) {                                   // Método: actualizar producto
    const product = await this.getProductById(id);                     // Verifica si el producto existe primero
    if (!product) {                                                    // Si no existe...
      throw new Error("Este producto no ha sido encontrado");          // Lanza error
    }
    return await productDAO.updateById(id, updates);                   // Si existe, llama al DAO para actualizar y devuelve el resultado
  }

  //////////////////////////////////////////////////////////////

  async deleteProduct(id) {                                            // Método: eliminar producto
    const product = await this.getProductById(id);                     // Verifica si el producto existe
    if (!product) {                                                    // Si no existe...
      throw new Error("Este producto no ha sido encontrado");          // Lanza error
    }
    await productDAO.deleteById(id);                                   // Si existe, elimina el producto llamando al DAO
    return { message: "El producto ha sido eliminado con éxito" };     // Devuelve mensaje de confirmación
  }
}
