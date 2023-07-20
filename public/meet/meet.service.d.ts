/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Meet, MeetDocument } from './schemas/meet.schema';
import { UserService } from 'src/user/user.service';
import { CreateMeetDto } from './dtos/createmeet.dto';
import { MeetObject, MettObjectDocument } from './schemas/meetobject.schemas';
import { UpdateMeetDto } from './dtos/updatemeet.dto';
export declare class MeetService {
    private readonly model;
    private readonly objectModel;
    private readonly userService;
    private readonly logger;
    constructor(model: Model<MeetDocument>, objectModel: Model<MettObjectDocument>, userService: UserService);
    getMeetsByUser(userId: String): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Meet> & Omit<Meet & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, Meet> & Omit<Meet & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    createMeet(userId: string, dto: CreateMeetDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Meet> & Omit<Meet & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, Meet> & Omit<Meet & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    deletetMeetByUser(userId: String, meetId: string): Promise<import("mongodb").DeleteResult>;
    getMeetObjects(meetId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, MeetObject> & Omit<MeetObject & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, MeetObject> & Omit<MeetObject & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    update(meetId: string, userId: string, dto: UpdateMeetDto): Promise<void>;
}
