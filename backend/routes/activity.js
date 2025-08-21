import express from 'express';
import { logActivity, getSummary, checkWalk } from '../controllers/activityController.js';

const router = express.Router();
router.post('/', logActivity);
router.get('/summary', getSummary);
router.get('/check-walk', checkWalk);

export default router;
