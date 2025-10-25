var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'inversify';
import bcryptjs from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { plainToInstance } from "class-transformer";
import { LoginResponseDto } from "../DTO/Reponse/LoginResponse.js";
import { verifyRefreshToken } from "../utils/jwt.js";
let AuthService = class AuthService {
    constructor(_authRepository) {
        this._authRepository = _authRepository;
    }
    async register(data) {
        const res = await this._authRepository.isUserExist(data.email);
        if (res) {
            return false;
        }
        else {
            const hashedPassword = await bcryptjs.hash(data.password, 10);
            data.password = hashedPassword;
            const result = await this._authRepository.createNewData(data);
            if (result)
                return true;
            else
                return false;
        }
    }
    async login(data) {
        console.log("Login data in service ::", data);
        const userData = await this._authRepository.isUserExist(data.email);
        if (!userData)
            return null;
        const isVerified = await bcryptjs.compare(data.password, userData.password);
        if (!isVerified || !userData) {
            return null;
        }
        else {
            const payload = {
                id: userData._id
            };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            const loginData = {
                userData: { ...plainToInstance(LoginResponseDto, userData, {
                        excludeExtraneousValues: true
                    }) },
                accessToken: accessToken ?? "",
                refreshToken: refreshToken ?? "",
            };
            console.log('REsult ::', loginData);
            return loginData;
        }
    }
    async getAccessToken(token) {
        return verifyRefreshToken(token);
    }
    async resetPassword(data) {
        try {
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
        }
        catch (err) {
            throw err;
        }
    }
};
AuthService = __decorate([
    injectable(),
    __param(0, inject('IAuthRepository')),
    __metadata("design:paramtypes", [Object])
], AuthService);
export { AuthService };
