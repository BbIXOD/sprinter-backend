import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { NoIdUserDto, SafeUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(user: RegisterDto): Promise<SafeUserDto> {
    const userDto: NoIdUserDto = { ...user };
    const resultUserDto = await this.usersService.createUser(userDto);
    console.log('user created');
    return resultUserDto;
  }
}
