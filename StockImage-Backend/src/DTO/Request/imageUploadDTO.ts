import { IsInt, IsNotEmpty, IsString, Min,Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class ImageUploadDto{

    @IsNotEmpty()
    @Transform(({ value }) => new Types.ObjectId(value._id))
    userId!:Types.ObjectId;

    image!:string;

    @IsString()
    @IsNotEmpty()
    title!:string;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(9)
    order!:number;

}
