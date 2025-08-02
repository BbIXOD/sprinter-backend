import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto';
import { JwtAuthGuard } from 'src/common/guards';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsServive: BoardsService) {}

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req: any) {
    return this.boardsServive.createBoard(createBoardDto, req.user.userId);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string) {
    return this.boardsServive.deleteBoard(id);
  }
}
