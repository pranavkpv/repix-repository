import { Expose, Transform  } from 'class-transformer'

export class LoginResponseDto{

    @Transform(({obj}) => obj._id.toString())
    @Expose()
    id!:string;

    @Expose()
    name!:string;

    @Expose()
    phone!:string;

    @Expose()
    email!:string;
}