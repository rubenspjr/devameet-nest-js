import { IsBoolean} from "class-validator";
import { JoinRoomDto } from "./joinroom.dto";
import { MeetMessagesHelper } from "src/meet/helpers/meet.messageshelper";
import { RoomMessagesHelper } from "../helpers/room.messages.helper";


export class toglMuteDto extends JoinRoomDto{
    
    @IsBoolean({message: RoomMessagesHelper.JOIN_MUTE_NOT_VALID})
    muted: boolean;

}