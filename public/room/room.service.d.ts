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
import { Model } from 'mongoose';
import { Meet, MeetDocument } from 'src/meet/schemas/meet.schema';
import { MeetObject, MettObjectDocument } from 'src/meet/schemas/meetobject.schemas';
import { Position, PositionDocument } from './schemas/position.schama';
import { inRoom } from './dtos/in.Room';
import { UserService } from 'src/user/user.service';
import { UpdateUserPositionDto } from './dtos/updadeposition.dto';
import { toglMuteDto } from './dtos/toglMute.dto';
export declare class RoomService {
    private readonly meetModel;
    private readonly objectModel;
    private readonly positionModel;
    private readonly userService;
    private logger;
    constructor(meetModel: Model<MeetDocument>, objectModel: Model<MettObjectDocument>, positionModel: Model<PositionDocument>, userService: UserService);
    getRoom(link: string): Promise<{
        link: string;
        name: string;
        color: string;
        objects: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, MeetObject> & Omit<MeetObject & {
            _id: import("mongoose").Types.ObjectId;
        }, never>> & Omit<import("mongoose").Document<unknown, {}, MeetObject> & Omit<MeetObject & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>)[];
    }>;
    listUserPositionsByLink(link: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Position> & Omit<Position & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, Position> & Omit<Position & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    deleteUserPosition(clientId: string, dto: inRoom): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Position> & Omit<Position & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, Position> & Omit<Position & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    updateUserPosition(clientId: string, dto: UpdateUserPositionDto): Promise<void>;
    findPreviousUserPosition(link: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Position> & Omit<Position & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, Position> & Omit<Position & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    updateUserMute(dto: toglMuteDto): Promise<void>;
    _getMeet(link: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Meet> & Omit<Meet & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, Meet> & Omit<Meet & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
}
