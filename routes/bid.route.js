import { Router } from 'express';
import { getAllBids, placeBid } from '../controllers/bid';
import auth from '../middleware/auth';

const router = Router({ mergeParams: true });

router.get('/', getAllBids);
router.post('/', auth, placeBid);

export default router;