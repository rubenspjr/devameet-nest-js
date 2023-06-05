import {BadRequestException, Body, Controller, Get, Put, HttpCode, Request, HttpStatus} from "@nestjs/common";
import { UserService } from "./user.service";
import { use } from "passport";
import { UserMessagesHelper } from "./helpers/messages.helper";
import { UpadateUserDto } from "./dtos/upadateuser.sto";

@Controller("user")
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get()
    async getUser(@Request() req) {
        const {userId} = req?.user;
        const user = await this.userService.getUserById(userId);

        if(!user){
            throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND);
        }
        return{
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id:user._id
        }
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUser(@Request() req, @Body() dto:UpadateUserDto){
        const {userId} = req?.user;
        await this.userService.updateUser(userId, dto)
    }
}