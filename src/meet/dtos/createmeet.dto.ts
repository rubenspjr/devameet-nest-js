import { Matches, MinLength } from "class-validator";
import { MeetMessagesHelper } from "../helpers/meet.messageshelper";


export class CreateMeetDto{
    @MinLength(2,{message: MeetMessagesHelper.CREATE_NAME_NOT_VALID})
    name: string;

    
    @Matches(/[0-9A-Fa-f]{3,6}/g, {message: MeetMessagesHelper.CREATE_COLOR_NOT_VALID},)
    color: string;
}