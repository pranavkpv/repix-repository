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
import { inject, injectable } from 'inversify';
import { StatusCode } from '../enum/StatusCode.js';
import { StatusMessage } from '../enum/StatusMessage.js';
let AuthController = class AuthController {
    constructor(_authService) {
        this._authService = _authService;
        this.register = async (req, res, next) => {
            try {
                console.log("Request id ::", req.body);
                const result = await this._authService.register(req.body);
                if (result) {
                    res.status(StatusCode.CREATED).json({ message: StatusMessage.SUCCESS });
                }
                else {
                    res.status(StatusCode.FORBIDDEN).json({ message: StatusMessage.FAILURE });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.login = async (req, res, next) => {
            try {
                console.log('Login Details ::', req.body);
                const result = await this._authService.login(req.body);
                if (result) {
                    res.cookie("token", result.refreshToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                        maxAge: 10 * 24 * 60 * 60 * 1000,
                    });
                    res.status(StatusCode.OK).json({ message: StatusMessage.SUCCESS, loginData: result });
                }
                else {
                    res.status(StatusCode.FORBIDDEN).json({ message: StatusMessage.FAILURE });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.getAccessToken = async (req, res, next) => {
            try {
                if (!req.cookies || !req.cookies.token) {
                    res.status(StatusCode.BAD_REQUEST).json({ message: StatusMessage.SUCCESS });
                    return;
                }
                const refreshToken = req.cookies.token;
                const accessToken = await this._authService.getAccessToken(refreshToken);
                if (accessToken) {
                    res.status(StatusCode.OK).json({ success: true, accessToken });
                }
                else {
                    res.status(StatusCode.UNAUTHORIZED).json({ success: false, message: StatusMessage.REFRESH_TOKEN_EXPIRED });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                res.clearCookie('token', { httpOnly: true, secure: true, sameSite: "strict", });
                res.status(StatusCode.OK).json({ success: true, message: StatusMessage.LOGOUT_SUCCESS });
            }
            catch (err) {
                next(err);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                console.log("Data received ::", req.body);
                const result = await this._authService.resetPassword(req.body);
                let message;
                let statusCode;
                switch (result) {
                    case 1:
                        statusCode = StatusCode.BAD_REQUEST;
                        message = StatusMessage.FAILURE;
                        break;
                    case 2:
                        statusCode = StatusCode.BAD_REQUEST;
                        message = StatusMessage.INVALID_OLD_PASSWORD;
                        break;
                    case 3:
                        statusCode = StatusCode.OK;
                        message = StatusMessage.RESET_SUCCESS;
                        break;
                    case 4:
                        statusCode = StatusCode.BAD_REQUEST;
                        message = StatusMessage.FAILURE;
                        break;
                    default:
                        statusCode = StatusCode.BAD_REQUEST;
                        message = StatusMessage.FAILURE;
                        break;
                }
                res.status(statusCode).json({ success: true, message });
            }
            catch (err) {
                next(err);
            }
        };
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject('IAuthService')),
    __metadata("design:paramtypes", [Object])
], AuthController);
export { AuthController };
