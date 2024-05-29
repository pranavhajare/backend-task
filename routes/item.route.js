import { Router } from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/item';
import auth from '../middleware/auth';
import { single } from '../middleware/upload';

const router = Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', auth, single('image'), createItem);
router.put('/:id', auth, single('image'), updateItem);
router.delete('/:id', auth, deleteItem);

export default router;