import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';

@Module({
  providers: [MembershipsService],
  exports: [MembershipsService],
  controllers: [MembershipsController],
})
export class MembershipsModule {}
