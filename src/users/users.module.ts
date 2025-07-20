import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AccessGuard } from './guards';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AccessGuard,
  ],
  exports: [UsersService],
})
export class UsersModule {}
