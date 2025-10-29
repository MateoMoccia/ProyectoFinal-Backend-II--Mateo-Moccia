import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    try{
await mongoose.connect('mongodb://127.0.0.1:27017/backend2') //Puerto usual para conectar a mongodb
console.log(`MongoDB conectado exitosamente!!`);
    
}
    catch (error){
        console.error(error);
        process.exit (1); //Detener aplicacion en caso de error
    }
};

// CONECTAR A MONGO ATLAS