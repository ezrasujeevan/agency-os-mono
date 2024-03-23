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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(createUserDto) {
        const user = this.userRepo.create(createUserDto);
        return await this.userRepo.save(user);
    }
    async findAll() {
        const users = await this.userRepo.find();
        return { users };
    }
    async findOneById(findOneUserDto) {
        const { id } = findOneUserDto;
        const user = await this.userRepo.findOne({ where: { id } });
        if (user !== undefined && user) {
            return user;
        }
        throw new common_1.NotFoundException(`user not found by id ${findOneUserDto.id}`);
    }
    async findOneByEmail(findOneUserDto) {
        const { email } = findOneUserDto;
        const user = await this.userRepo.findOne({ where: { email } });
        if (user !== undefined && user) {
            return user;
        }
        throw new common_1.NotFoundException(`user not found by email ${findOneUserDto.email}`);
    }
    async update(id, updateUserDto) {
        const user = await this.findOneById({ id });
        if (user && user !== undefined) {
            return await this.userRepo.save(user, {
                data: updateUserDto,
            });
        }
        throw new common_1.NotFoundException(`user not found by id ${id}`);
    }
    async remove(findOneUserDto) {
        const user = await this.userRepo.findOne({
            where: { id: findOneUserDto.id },
        });
        if (user && user !== undefined) {
            return await this.userRepo.remove(user);
        }
        throw new common_1.NotFoundException(`user not found by id ${findOneUserDto.id}`);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map