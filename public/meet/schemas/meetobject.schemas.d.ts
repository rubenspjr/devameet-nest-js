import { Meet } from "./meet.schema";
import mongoose, { HydratedDocument } from "mongoose";
export type MettObjectDocument = HydratedDocument<MeetObject>;
export declare class MeetObject {
    meet: Meet;
    name: string;
    x: number;
    y: number;
    zIndex: number;
    orientation: string;
}
export declare const MeetObjectSchema: mongoose.Schema<MeetObject, mongoose.Model<MeetObject, any, any, any, mongoose.Document<unknown, any, MeetObject> & Omit<MeetObject & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MeetObject, mongoose.Document<unknown, {}, mongoose.FlatRecord<MeetObject>> & Omit<mongoose.FlatRecord<MeetObject> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
