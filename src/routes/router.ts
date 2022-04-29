import { Router } from 'express';
import adminRoutes from './adminRoutes';
// Rotas
import userRoutes from './userRoutes';
import sendMailRoutes from './sendMailRoutes';

const router = Router();

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/recover-password', sendMailRoutes);

export default router;
