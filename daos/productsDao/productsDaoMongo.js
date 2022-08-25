import Products from '../../components/products/productsModel.js';
import logger from '../../utils/winston.js';

class productsDaoMongo{
    constructor(){
        if(productsDaoMongo.instance == null){
           productsDaoMongo.instance = this;
        }
        return productsDaoMongo.instance;
    }

    async get(id){
        try{
            return await Products.findById(id);
        }catch(error){
            logger.error(`Error al obtener el producto de la db: ${error}`);
        }
    }

    async getAll(){
        try{
            return await Products.find(query);
        }catch(error){
            logger.error(`Error al obtener todos los productos de la db: ${error}`);
        }
    }

    async create(product){
        try{
            return await Products.create(product);
        }catch(error){
            logger.error(`Error al crear el producto en la db: ${error}`);
        }
    }

    async update(id, updateProduct){
        try{
            return await Products.findByIdAndUpdate(id, updateProduct);
        }catch(error){
            logger.error(`Error al actualizar el producto en la db: ${error}`);
        }
    }

    async delete(id){
        try{
            return await Products.findByIdAndDelete(id);
        }catch(error){
            logger.error(`Error al eliminar el producto en la db: ${error}`);
        }
    }
}

export default  productsDaoMongo;
