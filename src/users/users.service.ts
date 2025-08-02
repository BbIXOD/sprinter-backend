import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Access } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoIdUserDto as CreateUserDto, SafeUserDto, UserDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    const logger = new Logger('UsersService');
    const admin = await this.prisma.user.findUnique({
      where: {
        email: this.configService.get('ADMIN_EMAIL'),
      },
    });

    if (!!admin) {
      logger.log('Admin already exists');
      return;
    }

    await this.prisma.user.create({
      data: {
        name: this.configService.get('ADMIN_NAME')!,
        email: this.configService.get('ADMIN_EMAIL')!,
        password: await argon.hash(this.configService.get('ADMIN_PASSWORD')!),
        access: Access.ADMIN,
      },
    });

    logger.log('Admin created');
  }

  getAll() {
    return this.prisma.user.findMany();
  }

  createUser(createUserDto: CreateUserDto){
    return this.prisma.user.create({
      data: { ...createUserDto, access: Access.USER },
    });
  }

  findById(id: string){
    return this.prisma.user.findUnique({ where: { id } });

  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
