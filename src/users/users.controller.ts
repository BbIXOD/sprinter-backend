import { Controller, Get, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "@nestjs/common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAll() {
    const users = await this.usersService.getAll(); 
    return users;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() req: any) {
    const id = req.user.userId;
    const user = this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

}
