import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [MembershipsModule],
})
export class TasksModule {}
