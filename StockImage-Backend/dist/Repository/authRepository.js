import User from '../Models/userModel.js';
import { BaseRepository } from '../Repository/baseRepository.js';
export class AuthRepository extends BaseRepository {
    constructor() {
        super(User);
        this._userModel = User;
    }
    async isUserExist(email) {
        try {
            const data = await this._userModel.findOne({ email });
            if (data)
                return data;
            else
                return null;
        }
        catch (err) {
            return null;
        }
    }
    async resetPassword(userId, hashedPassword) {
        try {
            const res = await this._userModel.findByIdAndUpdate(userId, {
                $set: { password: hashedPassword }
            });
            console.log("Update result ::", res);
            return res ? true : false;
        }
        catch (err) {
            throw err;
        }
    }
}
