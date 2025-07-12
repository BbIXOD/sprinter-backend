import { Body, Controller, Post, } from '@nestjs/common';
import { RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { SafeUserDto } from 'src/users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() request: RegisterDto): Promise<SafeUserDto> {
    return this.authService.register(request);
  }
}
