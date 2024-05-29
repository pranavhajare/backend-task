import { Router } from 'express';
import { register, login, profile } from '../controllers/user';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);

export default router;