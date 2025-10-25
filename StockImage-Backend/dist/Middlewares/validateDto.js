import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
export function validateDto(dtoClass) {
    return async (req, res, next) => {
        console.log(req.body);
        const dto = plainToInstance(dtoClass, req.body, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
        const errors = await validate(dto, { whitelist: true });
        if (errors.length > 0) {
            console.log('Errors ::', errors);
            return res.status(400).json({
                message: 'Validation Failed !',
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints,
                }))
            });
        }
        req.dto = dto;
        next();
    };
}
