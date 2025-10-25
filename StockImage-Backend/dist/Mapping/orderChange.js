import { CustomError } from '../utils/error.js';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ImageOrderDto } from '../DTO/Request/ImageOrderDto.js';
export async function imageOrderChangeMapper(req) {
    try {
        const { images } = req.body;
        if (!images) {
            throw new CustomError("Missing Field");
        }
        const dtos = images.map((image) => plainToInstance(ImageOrderDto, image));
        for (let dto of dtos) {
            await validateOrReject(dto, { whitelist: true,
                forbidNonWhitelisted: true });
        }
        return dtos;
    }
    catch (err) {
        throw err;
    }
}
