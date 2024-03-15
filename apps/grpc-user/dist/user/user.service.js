"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let UserService = class UserService {
    constructor() {
        this.users = [];
    }
    onModuleInit() {
        for (let index = 0; index < 100; index++) {
            this.create({ email: (0, crypto_1.randomUUID)(), password: (0, crypto_1.randomUUID)() });
        }
    }
    create(createUserDto) {
        const user = {
            ...createUserDto,
            id: (0, crypto_1.randomUUID)(),
        };
        this.users.push(user);
        return user;
    }
    findAll() {
        return { users: this.users };
    }
    findOne(findOneUserDto) {
        const user = this.users.find((user) => user.id === findOneUserDto.id);
        if (user !== undefined) {
            return user;
        }
        throw new common_1.NotFoundException(`user not found by id ${findOneUserDto.id}`);
    }
    update(id, updateUserDto) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                ...this.users[userIndex],
                ...updateUserDto,
            };
            return this.users[userIndex];
        }
        throw new common_1.NotFoundException(`user not found by id ${id}`);
    }
    remove(findOneUserDto) {
        const userIndex = this.users.findIndex((user) => user.id === findOneUserDto.id);
        if (userIndex !== -1) {
            return this.users.splice(userIndex)[0];
        }
        throw new common_1.NotFoundException(`user not found by id ${findOneUserDto.id}`);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map