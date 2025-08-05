import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
  imports: [MembershipsModule],
})
export class StatusesModule {}
