import { Request, Response } from 'express';
import AuthUser from '../middleware/authUser';
import { connection } from '../config/database';
import { User } from '../models/user';

export default class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, admin, password, state, city } = await req.body;
      const userRepository = connection.getRepository(User);
      const emailFind = await userRepository.findOne({where: {email}});
      const phoneFind = await userRepository.findOne({where: {phone}});

      if (emailFind || phoneFind) {
        return res.status(409).json({
          message: `${
            emailFind ? 'Email' : 'Número de telefone'
          } já cadastrado`,
        });
      }
      const user = new User();
      user.email = email;
      user.city = city;
      user.name = name;
      user.state = state;
      user.password = password;
      user.admin = admin;
      user.phone = phone;
      
      if (
        user.admin &&
        req.body.token !== process.env.RESEARCHER_CONFIRMATION_CODE
      ) {
        return res
          .status(401)
          .json({ message: 'Código de pesquisador invalido!' });
      }


      await userRepository.save(user);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  getAllUsers = async (res: Response) => {
    try {
      const userRepository = connection.getRepository(User);
      const data = await userRepository.find({})
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  login = async (req: Request, res: Response) => {
    const { emailPhone, password } = req.body;
    const authenticateUser = new AuthUser();
    try {
      const userRepository = connection.getRepository(User);
      const user =
        (await userRepository.findOne({where: {email: emailPhone}})) ||
        (await userRepository.findOne({where: {phone: emailPhone}}));
    
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontado: Email ou telefone inválido!',
        });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: 'Senha inválida' });
      }
      
      const token = await authenticateUser.generateToken({
        id: user.id,
        email: user.email,
        password: user.password,
        admin: user.admin,
      });

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        admin: user.admin,
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Falha no sistema ao logar, tente novamente!' });
    }
  };
}
