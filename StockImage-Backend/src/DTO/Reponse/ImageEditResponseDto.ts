import { Expose , Transform } from 'class-transformer';

export class EditImageResponseDto{
    @Transform(({obj}) => obj._id.toString())
    @Expose()
    id!:string;

    @Transform(({obj}) => obj.userId.toString())
    @Expose()
    userId!:string;

    @Expose()
    title!:string;

    @Expose()
    order!:string;
}
