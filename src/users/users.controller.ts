import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "generated/prisma";
import { plainToInstance } from "class-transformer";
import { SafeUserDto } from "./dto/safe-user-dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAll() {
    const users = await this.usersService.getAll(); 
    return users.map(user => this.sanitizeUser(user));
  }

  sanitizeUser(user: User) {
    plainToInstance(SafeUserDto, user, {excludeExtraneousValues: true})
  }
}
