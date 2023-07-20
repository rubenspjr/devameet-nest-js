"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetModule = void 0;
const common_1 = require("@nestjs/common");
const meet_controller_1 = require("./meet.controller");
const meet_service_1 = require("./meet.service");
const user_module_1 = require("../user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const meet_schema_1 = require("./schemas/meet.schema");
const meetobject_schemas_1 = require("./schemas/meetobject.schemas");
let MeetModule = class MeetModule {
};
MeetModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, mongoose_1.MongooseModule.forFeature([
                { name: meet_schema_1.Meet.name, schema: meet_schema_1.MeetSchema },
                { name: meetobject_schemas_1.MeetObject.name, schema: meetobject_schemas_1.MeetObjectSchema }
            ])],
        controllers: [meet_controller_1.MeetController],
        providers: [meet_service_1.MeetService],
        exports: [mongoose_1.MongooseModule, meet_service_1.MeetService]
    })
], MeetModule);
exports.MeetModule = MeetModule;
//# sourceMappingURL=meet.module.js.map