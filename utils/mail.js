import nodemailer from "nodemailer";
import logger from "./winston.js";
import emailConfig from "../config/emailConfig.js";

const TEST_EMAIL = 'Dolce@ethereal.email'    


const transporter = nodemailer.createTransport({
    hots: emailConfig.EMAIL_ETH_HOST,
    port: emailConfig.EMAIL_ETH_PORT,
    auth: {
        user: emailConfig.EMAIL_ETH_USER,
        pass: emailConfig.EMAIL_ETH_PASS,
    },
});

export async function singUpEmail(newUser){
    const mailOptions = {
        from: 'Administracion DOLCE <Dolce@ethereal.email>',
        to: `${newUser.email}`,
        subject: 'Bienvenido a DOLCE',
        html: `  <h1>Hola ${newUser.name}</h1> 
        <p>Gracias por registrarte en DOLCE</p>
        <p>EMAIL: ${newUser.email}</p>
        <p>Si no creaste esta cuenta puedes ignorar el mensaje</p>`
    }
    try{
        await transporter.sendMail(mailOptions);
    }catch(error){
        logger.error(`Error al enviar el email: ${error}`);
    }
}

export async function checkOutEmail(newOrder){
    const mailOptions = {
        from:'Administradora DOLCE <Dolce@ethereal.email>',
        to: TEST_EMAIL,
        subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
        html: `<h1>Pedido</h1>
        ${newOrder.products.map(x=>`<li>${x.product}, cantidad: ${x.quantity}</li>`)}
        `,
    }
    try{
        await transporter.sendMail(mailOptions);
    }catch(error){
        logger.error(`Error al enviar el email: ${error}`);
    }

}