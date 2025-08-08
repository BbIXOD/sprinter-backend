import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { BoardAccessGuard } from './guards';

@Module({
  providers: [MembershipsService, BoardAccessGuard],
  exports: [MembershipsService, BoardAccessGuard],
  controllers: [MembershipsController],
})
export class MembershipsModule {}
