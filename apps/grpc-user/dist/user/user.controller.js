"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const proto_1 = require("@agency-os/proto");
const common_2 = require("@agency-os/common");
const auth_1 = require("@agency-os/auth");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserRequestDto) {
        return await this.userService.create(createUserRequestDto);
    }
    async findAllUser() {
        return { users: await this.userService.findAll({}) };
    }
    async findOneUserbyId(findOneUserByIdRequestDto) {
        return await this.userService.findOneById(findOneUserByIdRequestDto);
    }
    async findOneUserByEmail(findOneUserByEmailRequestDto) {
        return await this.userService.findOneByEmail(findOneUserByEmailRequestDto);
    }
    async updateUser(updateUserRequestDto) {
        return await this.userService.update(updateUserRequestDto.id, updateUserRequestDto);
    }
    async removeUser(findOneUserByIdRequestDto) {
        return await this.userService.remove(findOneUserByIdRequestDto);
    }
    async registerUser(createUserRequestDto) {
        return await this.userService.register(createUserRequestDto);
    }
    async loginUser(loginUserRequestDto) {
        return await this.userService.login(loginUserRequestDto);
    }
    async validateUser(validateUserRequestDto) {
        return await this.userService.validate(validateUserRequestDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(auth_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.User.CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.User.FindOneUserByIdRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneUserbyId", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.User.FindOneUserByEmailRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneUserByEmail", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.User.UpdateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.User.FindOneUserByIdRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    proto_1.UserProto.UserServiceControllerMethods(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map