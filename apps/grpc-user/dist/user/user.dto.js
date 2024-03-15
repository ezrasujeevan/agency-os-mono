"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.FindOneUserDto = exports.CreateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
class FindOneUserDto {
}
exports.FindOneUserDto = FindOneUserDto;
class UpdateUserDto extends (0, mapped_types_1.PartialType)(CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.dto.js.map