import yargObj from '../../utils/yargs.js';
import productsDaoMongo from './productsDaoMongo.js';
import logger from '../../utils/winston.js';

const type = yargObj.persistence.toUpperCase();

class ProductDaoFactory{
    getDao(){
        if(type === 'MONGO'){
            return new productsDaoMongo();
        }else{
            logger.log('info', 'No se encontro el tipo de persistencia');
            return new productsDaoMongo();
        }
    }
}

export default new ProductDaoFactory();