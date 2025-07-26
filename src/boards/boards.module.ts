import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  providers: [BoardsService],
  controllers: [BoardsController],
  imports: [MembershipsModule],
})
export class BoardsModule {}
