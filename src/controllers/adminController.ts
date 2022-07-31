/* eslint-disable consistent-return */
import { Request, Response } from 'express';
// import AuthUser from '../middleware/authUser';
import { connection } from '../config/database';
import { User } from '../models/user';

export default class AdminController {
  deleteUser = async (req: Request, res: Response) => {
    try {
      // const { email, token, city, name, state, phone } = await req.body;
      const token = req.headers.authorization?.split(' ')[1];
      const id = Number(req.params.id);
      const userRepository = connection.getRepository(User);
      const userExist = await userRepository.findOne({ where: { id } });

      if (userExist && token === process.env.ADMIN_CONFIRMATION_CODE) {
        await userRepository.remove(userExist);

        return res.status(200).json(userExist);
      }
      if (!userExist) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        });
      }
      if (token || token !== process.env.ADMIN_CONFIRMATION_CODE) {
        return res.status(401).json({
          message: 'Você não tem autorização para deletar usuários',
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: 'Falha no sistema ao deletar, tente novamente!',
      });
    }
  };

  editUser = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, state, city, token } = await req.body;
      const userRepository = connection.getRepository(User);
      const userExistEdit = await userRepository.findOne({ where: { email } });
      const emailTaken = await userRepository.findOne({ where: { email } });
      const phoneTaken = await userRepository.findOne({ where: { phone } });

      if (userExistEdit?.email !== email) {
        if (emailTaken) {
          return res.status(409).json({
            message: 'Email já cadastrado!',
          });
        }
      }

      if (userExistEdit?.phone !== phone) {
        if (phoneTaken) {
          return res.status(409).json({
            message: 'Número de telefone já cadastrado!',
          });
        }
      }

      if (userExistEdit && token === process.env.ADMIN_CONFIRMATION_CODE) {
        userExistEdit.name = name;
        userExistEdit.email = email;
        userExistEdit.phone = phone;
        userExistEdit.state = state;
        userExistEdit.city = city;
        await userRepository.save(userExistEdit);

        return res.status(200).json(userExistEdit);
      }
      if (!userExistEdit) {
        return res.status(404).json({
          // Mudar para erro item não encontrado
          message: 'O usuário que você quer editar não existe',
        });
      }
      if (token || token !== process.env.ADMIN_CONFIRMATION_CODE) {
        return res.status(503).json({
          message: 'Você não tem permissão de editar um usuário',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema ao deletar, tente novamente!',
      });
    }
  };
}
