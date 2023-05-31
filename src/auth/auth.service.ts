import { LoginDto } from "./dtos/login.dto";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { MessagesHelper } from "./helpers/messages.helper";
import { ResgisterDto } from "src/user/dtos/register";
import { UserService } from "src/user/user.service";
import { UserMessagesHelper } from "src/user/helpers/messages.helper";


@Injectable()
export class AuthService {
    private logger = new Logger (AuthService.name);

    constructor(private readonly userService: UserService){}

    login(dto:LoginDto){
        this.logger.debug('login - started')
        if(dto.login !== 'teste@teste.com' || dto.password !== 'teste@123'){
            throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGINF_NOT_FOUND)
        }

        return dto;
    }

    async register (dto: ResgisterDto) {
        this.logger.debug('register - started');
        if(await this.userService.existsByEmail(dto.email)){
            throw new BadRequestException(UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT);
        }
        await this.userService.create(dto);
    }
}