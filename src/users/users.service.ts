import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoIdUserDto, SafeUserDto, UserDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<SafeUserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => plainToInstance(SafeUserDto, user));
  }

  async createUser(data: NoIdUserDto): Promise<SafeUserDto> {
    const user = await this.prisma.user.create({
      data: data,
    });

    return plainToInstance(SafeUserDto, user);
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return plainToInstance(UserDto, user);
  }
}
