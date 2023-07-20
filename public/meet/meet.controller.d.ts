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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MeetService } from './meet.service';
import { GetMeetDto } from './dtos/getmeet.dto';
import { CreateMeetDto } from './dtos/createmeet.dto';
import { UpdateMeetDto } from './dtos/updatemeet.dto';
export declare class MeetController {
    private readonly service;
    constructor(service: MeetService);
    getUser(req: any): Promise<GetMeetDto[]>;
    createMeet(req: any, dto: CreateMeetDto): Promise<void>;
    deleteMeet(req: any, params: any): Promise<void>;
    getObjectByMeetId(req: any, params: any): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/meetobject.schemas").MeetObject> & Omit<import("./schemas/meetobject.schemas").MeetObject & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("./schemas/meetobject.schemas").MeetObject> & Omit<import("./schemas/meetobject.schemas").MeetObject & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    upadate(req: any, params: any, dto: UpdateMeetDto): Promise<void>;
}
