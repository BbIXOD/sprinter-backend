import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoIdUserDto, SafeUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(user: NoIdUserDto): Promise<SafeUserDto> {
    console.log('creating user');
    console.log(user);
    const resultUserDto: SafeUserDto = { ... await this.prisma.user.create({
      data: user,
    }) };
    console.log(resultUserDto);

    return resultUserDto;
  }
}
