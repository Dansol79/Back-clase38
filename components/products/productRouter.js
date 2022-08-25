import { Router } from 'express';
import {getProducts, getProduct, createProduct, updateProduct, deleteProduct, addProductToCart} from './productsController.js';
const productRouter = Router();

export default (app) => {
    app.use('/products', productRouter);

    productRouter.get('/list', getProducts);

    productRouter.get('/list/:id', getProduct);
    
    productRouter.post('/create',createProduct);
    
    productRouter.post('/list/:id', addProductToCart);

    productRouter.put('/update/:id', updateProduct);

    productRouter.delete('/delete/:id', deleteProduct);
}