import { IAuthService } from "../Interfaces/Auth/authService.js";
import { IAuthRepository } from "../Interfaces/Auth/authRepository.js";
import { injectable, inject } from 'inversify';
import { RegisterRequestDto } from "../DTO/Request/registerDTO.js";
import bcryptjs from 'bcryptjs';
import { LoginDto} from '../DTO/Request/loginDTO.js';
import { TUserData , TokenPayload, TLoginResponse } from '../types/types.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { plainToInstance } from "class-transformer";
import { LoginResponseDto } from "../DTO/Reponse/LoginResponse.js";
import { verifyRefreshToken } from "../utils/jwt.js";
import { ResetPasswordDto } from "../DTO/Request/ResetPasswordDto.js";

@injectable()
export class AuthService implements IAuthService{
     constructor(
        @inject ('IAuthRepository') private readonly _authRepository : IAuthRepository
     ){}
        async register(data : RegisterRequestDto) :Promise<boolean>{
           const res = await this._authRepository.isUserExist(data.email);
           if(res){
               return false;
           }else{
               const hashedPassword = await bcryptjs.hash(data.password,10);
               data.password=hashedPassword;
               const result : RegisterRequestDto = await this._authRepository.createNewData(data);
               if(result) return true;
               else return false;
           }
        }
        async login( data :LoginDto):Promise<TLoginResponse | null>{
            console.log("Login data in service ::",data);
            const userData : TUserData | null = await this._authRepository.isUserExist(data.email);
            if(!userData) return null;
            const isVerified = await bcryptjs.compare(data.password,userData.password);
            if(!isVerified || !userData){
                return null;
            }else{
                    const payload :TokenPayload ={
                      id : userData._id
                    }
                    const accessToken = generateAccessToken(payload);
                    const refreshToken = generateRefreshToken(payload);
                    const loginData : TLoginResponse ={
                        userData : { ... plainToInstance(LoginResponseDto,userData,{
                                     excludeExtraneousValues: true }) },
                        accessToken : accessToken ?? "",
                        refreshToken : refreshToken ?? "", 
                }
                 console.log('REsult ::',loginData);
                 return loginData;
            }
        }
        async getAccessToken(token : string):Promise<string | null>{
            return verifyRefreshToken(token);
        }

        async resetPassword(data :ResetPasswordDto):Promise<number>{
            try{
              const userData = await this._authRepository.getOneData({ _id: data.userId });
              if (!userData) {
                    return 1;
              }
             const isVerified = await bcryptjs.compare(data.oldPassword, userData.password);
            if (!isVerified) {
            return 2; 
            }
            const hashedPassword = await bcryptjs.hash(data.newPassword, 10);
            const updateResult = await this._authRepository.resetPassword(data.userId, hashedPassword);

            return updateResult ? 3 : 4; 
            }catch(err){
                throw err;
            }
        }
}