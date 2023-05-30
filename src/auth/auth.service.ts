import { LoginDto } from "./dtos/login.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { MessagesHelper } from "./helpers/messages.helper";


@Injectable()
export class AuthService {
    login(dto:LoginDto){
        if(dto.login !== 'teste@teste.com' || dto.password !== 'teste@123'){
            throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGINF_NOT_FOUND)
        }

        return dto;
    }
}