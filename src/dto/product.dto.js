export class ProductDTO {                             
  constructor(product) {                                // El constructor recibe un objeto producto original

    this.title = product.title;                         // Título del producto
    this.description = product.description;             // Descripción del producto
    this.price = product.price;                         // Precio del producto
    this.stock = product.stock;                         // Stock disponible
    this.code = product.code;                           // Código interno 
    this.category = product.category;                   // Categoría a la que pertenece
    this.status = product.status;                       // Estado (activo o no)

  }
}
