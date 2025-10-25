import express from 'express';
import { auth } from '../Middlewares/isAuth.js';
const router = express.Router();
router.get('/profile', auth);
export default router;
