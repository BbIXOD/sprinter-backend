import { Body, Controller, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsServive: BoardsService) {}

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsServive.createBoard(createBoardDto);
  }
}
