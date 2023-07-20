import { LoginDto } from "./dtos/login.dto";
import { ResgisterDto } from "src/user/dtos/register";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private logger;
    constructor(userService: UserService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        email: string;
        name: string;
        token: string;
    }>;
    register(dto: ResgisterDto): Promise<void>;
}
