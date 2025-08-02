import { Controller, Delete, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request } from "@nestjs/common";
import { Accesses } from "./decorators";
import { Access } from "generated/prisma";
import { AccessGuard } from "./guards";
import { TransformTo } from "src/common/decorators";
import { SafeUserDto } from "./dto";

@TransformTo(SafeUserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessGuard)
  @Accesses([Access.ADMIN])
  @Get('all')
  async getAll() {
    const users = await this.usersService.getAll(); 
    return users;
  }

  @Get('me')
  async getMe(@Request() req: any) {
    const id = req.user.userId;
    const user = this.usersService.findById(id);

    return user;
  }

  async deleteMe(@Request() req: any) {
    const id = req.user.userId;
    return this.usersService.deleteUser(id);
  }

  @Delete('me')
  async delete(@Req() req: any) {
    return this.usersService.deleteUser(req.user.userId);
  }

}
