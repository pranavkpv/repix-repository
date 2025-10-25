import { IBaseRepository } from "../Base/baseRepository.js";
import { IUser } from "../../types/modelTypes.js";
import { TUserData } from "../../types/types.js";

export interface IAuthRepository extends IBaseRepository<IUser>{
    isUserExist(email: string):Promise<TUserData | null>
    resetPassword(userId: string,hashedPassword : string):Promise<boolean>;
}