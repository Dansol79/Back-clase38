import User from './userModel.js'
import logger from '../../utils/winston.js';
import {singUpEmail} from '../../utils/mail.js';


export async function signUp(req, res){
    const newUser = new User(req.body);
    newUser.photo = req.file.filename;
    newUser.cart = [];
    singUpEmail(newUser);
    try{
        await newUser.save();
        res.redirect('/login');
    }catch(error){
       logger.error(`Error al registrar ek usuario: ${error}`);
    }
}

