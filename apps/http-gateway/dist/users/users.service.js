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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const proto_1 = require("@agency-os/proto");
let UsersService = class UsersService {
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.userService = this.client.getService(proto_1.User.USER_SERVICE_NAME);
    }
    async create(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
    findAll() {
        return this.userService.findAllUser({});
    }
    findOne(id) {
        return this.userService.findOneUserbyId({ id });
    }
    update(id, updateUserDto) {
        return this.userService.updateUser({ ...updateUserDto, id });
    }
    remove(id) {
        return this.userService.removeUser({ id });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(proto_1.User.protobufPackage)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map