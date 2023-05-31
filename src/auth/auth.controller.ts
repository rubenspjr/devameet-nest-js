import { Controller, Post} from "@nestjs/common/decorators";
import { HttpCode, HttpStatus, Body} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { ResgisterDto } from "src/user/dtos/register";


@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService){}
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto){
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() dto: ResgisterDto){
    return this.authService.register(dto);
  }
  
}