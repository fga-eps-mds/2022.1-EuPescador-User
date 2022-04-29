import nodemailer, { Transporter } from 'nodemailer';
import { generateToken } from '../utils/generateToken';

export async function sendMailService(email: string) {
  let token = generateToken();
  const html = `
    <p>Olá! Para recuperar sua senha utilize este token no seu aplicativo: <b>${token}</b></p>
    <p>Caso você não tenha feito essa solicitação, apenas ignore esse e-mail.</p>
    <br>
    <p>Atensiosamente,</p>
    <b>Equipe EuPescador</b>
  `;

  let transporter: Transporter = nodemailer.createTransport({
    name: 'smtp.gmail.com',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `Eu Pescador <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: 'Recuperação de Senha',
    html,
  });
  await transporter.verify().then(console.log).catch(console.error);

  return token;
}
