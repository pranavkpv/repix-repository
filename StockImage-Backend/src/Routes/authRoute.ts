import express from 'express';
import {AuthController } from '../Controllers/authController.js';
import { container } from '../config/config.js';
import { RegisterRequestDto } from '../DTO/Request/registerDTO.js';
import { validateDto } from '../Middlewares/validateDto.js';
import { LoginDto } from '../DTO/Request/loginDTO.js';

const router   = express.Router();

const authController = container.get<AuthController>('AuthController');

router.post('/register',validateDto(RegisterRequestDto),authController.register);
router.post('/login',validateDto(LoginDto),authController.login);
router.post('/refresh',authController.getAccessToken);
router.post('/logout',authController.logout);

export default router;
