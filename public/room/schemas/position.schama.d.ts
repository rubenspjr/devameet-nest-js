import mongoose, { HydratedDocument } from "mongoose";
import { Meet } from "src/meet/schemas/meet.schema";
import { User } from "src/user/schemas/user.schema";
export type PositionDocument = HydratedDocument<Position>;
export declare class Position {
    meet: Meet;
    user: User;
    name: string;
    avatar: string;
    clientId: string;
    orientation: string;
    x: number;
    y: number;
    muted: boolean;
    inRoom: boolean;
}
export declare const PositionSchema: mongoose.Schema<Position, mongoose.Model<Position, any, any, any, mongoose.Document<unknown, any, Position> & Omit<Position & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Position, mongoose.Document<unknown, {}, mongoose.FlatRecord<Position>> & Omit<mongoose.FlatRecord<Position> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
