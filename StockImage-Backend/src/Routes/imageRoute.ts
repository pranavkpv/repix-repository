import express from 'express';
import { auth } from '../Middlewares/isAuth.js';
import { upload } from '../Middlewares/multer.js';
import { ImageController } from '../Controllers/imageController.js';
import { container } from '../config/config.js';
import { ResetPasswordDto } from '../DTO/Request/ResetPasswordDto.js';
import { validateDto } from '../Middlewares/validateDto.js';
import {AuthController } from '../Controllers/authController.js';

const router = express.Router();
const imageController = container.get<ImageController>('ImageController');
const authController = container.get<AuthController>('AuthController');
router.get('/profile',auth);
router.post('/uploads',upload.array("images"),imageController.uploadImages);
router.get('/images/:userId',auth,imageController.fetchImages);
router.delete('/images/:imageId',auth,imageController.deleteImages);
router.patch('/images/:imageId',auth,upload.single('image'),imageController.updateImage);
router.patch('/image-order',auth,imageController.saveOrder);
router.patch('/reset-password',auth,validateDto(ResetPasswordDto),authController.resetPassword);

export default router;