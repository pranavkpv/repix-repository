import {
    IsEmail,
    IsPhoneNumber,
    IsString,
    Length,
    Matches,
} from 'class-validator';
import { Expose,Transform } from 'class-transformer';

export class RegisterRequestDto{
    @Expose()
    @IsString()
    @Length(4,20)
    @Transform(({ value }) => value.trim())
    name!: string;

    @Expose()
    @IsEmail()
    @Transform(({value}) => value.toLowerCase())
    email!: string;
   
    @Expose()
    @IsPhoneNumber('IN',{message:'Phone must be a valid Indian phone number'})
    phone!:string; 

    @Expose()
    @IsString()
    @Length(8,20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,{
        message:'Password must contain letters and numbers'
    })
    password!:string;

    }