import { Request, Response } from 'express';
import { sendMailService } from '../services/sendMailService';
import { connection } from '../config/database';
import { User } from '../models/user';
import { Token } from '../models/token';
import { FindOptionsWhere } from 'typeorm';

export default class SendMailController {
  async sendMail(req: Request, res: Response) {
    try {
      const { email } = await req.body;

      const tokenValue = await sendMailService(email);

      const userRepository = connection.getRepository(User);
      const tokenRepository = connection.getRepository(Token);

      const user = await userRepository.findOne({ where: { email } });

      const token = new Token();
      token.value = tokenValue;
      token.user_id = String(user!.id);

      await tokenRepository.save(token);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const { value } = req.query as FindOptionsWhere<Token>;

      const tokenRepository = connection.getRepository(Token);

      const isTokenExists = await tokenRepository.findOne({
        where: { value: value },
      });

      if (isTokenExists) {
        await tokenRepository.remove(isTokenExists);
        return res
          .status(200)
          .json({ message: 'Token encontrado!', token: isTokenExists });
      } else {
        return res.status(404).json({
          message: 'Token não encontado!',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message:
          'Falha ao buscar token, tente gerar um token novamente e validá-lo!',
      });
    }
  }
}
