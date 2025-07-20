import { Controller, Get, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "@nestjs/common";
import { Accesses } from "./decorators";
import { Access } from "generated/prisma";
import { AccessGuard } from "./guards";
import { JwtAuthGuard } from "src/common/guards";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AccessGuard)
  @Accesses([Access.ADMIN])
  @Get('all')
  async getAll() {
    const users = await this.usersService.getAll(); 
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    const id = req.user.userId;
    const user = this.usersService.findById(id);

    return user;
  }

}
