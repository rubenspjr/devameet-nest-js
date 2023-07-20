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
exports.UpdateMeetObject = exports.UpdateMeetDto = void 0;
const createmeet_dto_1 = require("./createmeet.dto");
const class_validator_1 = require("class-validator");
const meet_messageshelper_1 = require("../helpers/meet.messageshelper");
const class_transformer_1 = require("class-transformer");
class UpdateMeetDto extends createmeet_dto_1.CreateMeetDto {
}
__decorate([
    (0, class_validator_1.IsArray)({ message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID }),
    (0, class_transformer_1.Type)(() => UpdateMeetObject),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], UpdateMeetDto.prototype, "objects", void 0);
exports.UpdateMeetDto = UpdateMeetDto;
class UpdateMeetObject {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID }),
    __metadata("design:type", String)
], UpdateMeetObject.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Min)(0, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Max)(8, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateMeetObject.prototype, "x", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Min)(0, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    (0, class_validator_1.Max)(8, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_XY_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateMeetObject.prototype, "y", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_ZINDEX_NOT_VALID }),
    __metadata("design:type", Number)
], UpdateMeetObject.prototype, "zIndex", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: meet_messageshelper_1.MeetMessagesHelper.UPDATE_ORIENTATION_NOT_VALID }),
    __metadata("design:type", String)
], UpdateMeetObject.prototype, "orientation", void 0);
exports.UpdateMeetObject = UpdateMeetObject;
//# sourceMappingURL=updatemeet.dto.js.map