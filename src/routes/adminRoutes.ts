import { Request, Response, Router } from 'express';
import AdminController from '../controllers/adminController';

const adminRoutes = Router();

const adminController = new AdminController();

adminRoutes.delete('/:id', (req: Request, res: Response) => {
    adminController.deleteUser(req, res);
});

adminRoutes.put('/', (req: Request, res: Response) => {
    adminController.editUser(req, res);
});

export default adminRoutes;
