import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  controllers: [SprintsController],
  providers: [SprintsService],
  imports: [MembershipsModule]
})
export class SprintsModule {}
