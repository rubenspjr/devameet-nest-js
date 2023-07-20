import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";
export type MeetDocument = HydratedDocument<Meet>;
export declare class Meet {
    user: User;
    name: string;
    color: string;
    link: string;
}
export declare const MeetSchema: mongoose.Schema<Meet, mongoose.Model<Meet, any, any, any, mongoose.Document<unknown, any, Meet> & Omit<Meet & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Meet, mongoose.Document<unknown, {}, mongoose.FlatRecord<Meet>> & Omit<mongoose.FlatRecord<Meet> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
