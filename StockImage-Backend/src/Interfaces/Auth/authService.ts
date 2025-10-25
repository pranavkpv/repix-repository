
import { RegisterRequestDto } from "../../DTO/Request/registerDTO.js";
import { LoginDto } from '../../DTO/Request/loginDTO.js';
import { TLoginResponse } from '../../types/types.js';
import { ResetPasswordDto } from "../../DTO/Request/ResetPasswordDto.js";

export interface IAuthService{
    register(data:RegisterRequestDto):Promise<boolean>
    login(data:LoginDto):Promise<TLoginResponse | null>;
    getAccessToken(token: string):Promise<string|null>;
    resetPassword(data:ResetPasswordDto):Promise<number>;
}