var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsPhoneNumber, IsString, Length, Matches, } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
export class RegisterRequestDto {
}
__decorate([
    Expose(),
    IsString(),
    Length(4, 20),
    Transform(({ value }) => value.trim()),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "name", void 0);
__decorate([
    Expose(),
    IsEmail(),
    Transform(({ value }) => value.toLowerCase()),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    Expose(),
    IsPhoneNumber('IN', { message: 'Phone must be a valid Indian phone number' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "phone", void 0);
__decorate([
    Expose(),
    IsString(),
    Length(8, 20),
    Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/, {
        message: 'Password must contain letters and numbers'
    }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
