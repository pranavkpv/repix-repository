import 'reflect-metadata';
import { Container } from 'inversify';

import { IAuthRepository } from '../Interfaces/Auth/authRepository.js';
import { IAuthService } from '../Interfaces/Auth/authService.js';
import { AuthService } from '../Services/authService.js';
import { AuthRepository } from '../Repository/authRepository.js';
import { AuthController } from '../Controllers/authController.js';
import { IimageRepository } from '../Interfaces/Image/IimageRepository.js';
import { IimageService } from '../Interfaces/Image/IimageService.js';
import { ImageController } from '../Controllers/imageController.js';
import { ImageService } from '../Services/imageService.js';
import { ImageRepository } from '../Repository/imageRepository.js';

const container = new Container();

container.bind<IAuthRepository>('IAuthRepository').toDynamicValue(() =>{
    return new AuthRepository();
});
container.bind<IAuthService>('IAuthService').to(AuthService).inSingletonScope();
container.bind<AuthController>('AuthController').to(AuthController).inSingletonScope();

container.bind<IimageRepository>('IimageRepository').toDynamicValue(() =>{
    return new ImageRepository();
});
container.bind<IimageService>('IimageService').to(ImageService).inSingletonScope();
container.bind<ImageController>('ImageController').to(ImageController).inSingletonScope();

export { container};