import { IAuthRepository } from '../Interfaces/Auth/authRepository.js';
import User from '../Models/userModel.js';
import {IUser } from '../types/modelTypes.js';
import { TUserData } from '../types/types.js';
import { BaseRepository } from '../Repository/baseRepository.js'

export class AuthRepository extends BaseRepository<IUser>  implements IAuthRepository{
    constructor(){
        super(User)
    }
    private readonly _userModel = User;

    async isUserExist(email :string):Promise< TUserData| null>{
        try{
            const data : TUserData | null= await this._userModel.findOne({email});
            if(data) return data;
            else return null;
        }catch(err){
            return null;
        }
    }
   
    async resetPassword(userId: string, hashedPassword: string):Promise<boolean>{
        try{
            const res = await this._userModel.findByIdAndUpdate(userId,{
                $set:{password:hashedPassword}
            });
            console.log("Update result ::",res);
            return res ? true : false;
        }catch(err){
             throw err;
        }
    }
   
}