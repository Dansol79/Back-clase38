import logger from "../../utils/winston.js";
import ProductsRepo from './repository.js';

export async function getProducts(req, res){
    try{
        const products = await ProductsRepo.getAll();
        res.json({products});
    }catch(error){
        logger.error(`Error al obtener los productos: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}

export async function getProduct(req, res){
    try{
        const id = req.params.id;
        const product = await ProductsRepo.get(id);

        if(!product){
        return res.status(400).json({ error_description: 'Producto no encontrado'});
        }
        res.cookie('id', product._id);
        res.render('product', {product});
    }catch(error){
        logger.error(`Error al obtener el producto: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}

export async function createProduct(req, res){
    try{
        const product = req.body;
        const newProduct = await ProductsRepo.create(product);

        return res.status(201).json({ product: newProduct });

    }catch(error){
        logger.error(`Error al crear el producto: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}

export async function updateProduct(req, res){
    try{
        const updateProduct = req.body;
        const id = req.params.id;
        if(await ProductsRepo.update(id, updateProduct)){
            const product = {
                _id: id,
                ...updateProduct
            };
            return res.status(200).json({ product });
        }
        return res.status(400).json({ error_description: 'Producto no encontrado'});
    }catch(error){
        logger.error(`Error al actualizar el producto: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}

export async function deleteProduct(req, res){
    try{
        const product = await ProductsRepo.delete(req.params.id)
        if(!product){
            return res.status(400).json({ error_description: 'Producto no encontrado'});
        }
        res.json({ product });
    }catch(error){
        logger.error(`Error al eliminar el producto: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}

export async function addProductToCart(req, res){
    try{
        const productId = req.cookie.id;
        const { quantity } = req.body;
        const user = req.user;
        ProductsRepo.addProductToCart(productId, quantity, user);
        res.redirect('/');
    }catch(error){
        logger.error(`Error al agregar el producto al carrito: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}