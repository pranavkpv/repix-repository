import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthService } from '../Services/authService.js';
import { AuthRepository } from '../Repository/authRepository.js';
import { AuthController } from '../Controllers/authController.js';
import { ImageController } from '../Controllers/imageController.js';
import { ImageService } from '../Services/imageService.js';
import { ImageRepository } from '../Repository/imageRepository.js';
const container = new Container();
container.bind('IAuthRepository').toDynamicValue(() => {
    return new AuthRepository();
});
container.bind('IAuthService').to(AuthService).inSingletonScope();
container.bind('AuthController').to(AuthController).inSingletonScope();
container.bind('IimageRepository').toDynamicValue(() => {
    return new ImageRepository();
});
container.bind('IimageService').to(ImageService).inSingletonScope();
container.bind('ImageController').to(ImageController).inSingletonScope();
export { container };
