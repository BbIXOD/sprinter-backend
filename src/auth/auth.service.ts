import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { NoIdUserDto, SafeUserDto } from 'src/users/dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
  async register(user: RegisterDto): Promise<SafeUserDto> {
    const { password, ...rest } = user;
    const hash = await argon.hash(password);
    const resultUserDto = await this.usersService.createUser({password: hash, ...rest } as NoIdUserDto);
    return resultUserDto;
  }

  async login(user: LoginDto): Promise<{ access_token: string }> {
    const resultUserDto = await this.usersService.findByEmail(user.email);

    if (!resultUserDto || !argon.verify(user.password, resultUserDto.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: resultUserDto.id, email: resultUserDto.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
