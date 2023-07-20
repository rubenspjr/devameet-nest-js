import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { ResgisterDto } from "src/user/dtos/register";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        email: string;
        name: string;
        token: string;
    }>;
    register(dto: ResgisterDto): Promise<void>;
}
