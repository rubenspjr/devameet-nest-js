import { CreateMeetDto } from "./createmeet.dto";
export declare class UpdateMeetDto extends CreateMeetDto {
    objects: Array<UpdateMeetObject>;
}
export declare class UpdateMeetObject {
    name: string;
    x: number;
    y: number;
    zIndex: number;
    orientation: string;
}
