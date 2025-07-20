import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Access } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoIdUserDto, SafeUserDto, UserDto } from './dto';
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
        email: this.configService.get('ADMIN_EMAIL')
      }
    })

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

  async getAll(): Promise<SafeUserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) =>
      plainToInstance(SafeUserDto, user, { excludeExtraneousValues: true }),
    );
  }

  async createUser(data: NoIdUserDto): Promise<SafeUserDto> {
    const user = await this.prisma.user.create({
      data: { ...data, access: Access.USER },
    });

    return plainToInstance(SafeUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<SafeUserDto | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return plainToInstance(SafeUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }
}
