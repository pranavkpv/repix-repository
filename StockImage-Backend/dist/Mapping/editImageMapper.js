import { plainToInstance } from 'class-transformer';
import { ImageEditDto } from '../DTO/Request/imageEditDto.js';
import { validateOrReject } from 'class-validator';
export async function imageEditMapper(req) {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        console.log('Inside Mapper ');
        const file = req.file;
        const { title } = req.body;
        const { imageId } = req.params;
        const dto = plainToInstance(ImageEditDto, {
            imageId,
            image: file.filename,
            title: JSON.parse(title),
        });
        await validateOrReject(dto);
        return dto;
    }
    catch (err) {
        console.log('Error in Image Edit Mapping ::', err);
        throw err;
    }
}
