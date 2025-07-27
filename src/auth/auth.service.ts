import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { NoIdUserDto, SafeUserDto } from 'src/users/dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
  async register(registerDto: RegisterDto): Promise<SafeUserDto> {
    const { password, ...rest } = registerDto;
    const hash = await argon.hash(password);
    const user = await this.usersService.createUser({password: hash, ...rest } as NoIdUserDto);
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const resultUserDto = await this.usersService.findByEmail(loginDto.email);

    if (!resultUserDto || !argon.verify(resultUserDto.password, loginDto.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: resultUserDto.id, email: resultUserDto.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
