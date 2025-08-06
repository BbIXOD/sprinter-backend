import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto, CreateBoardDto, UpdateBoardDto } from './dto';
import { TransformTo } from 'src/common/decorators';

@TransformTo(BoardDto)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsServive: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @Req() req: any) {
    return this.boardsServive.create(createBoardDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.boardsServive.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsServive.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsServive.update(id, updateBoardDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.boardsServive.delete(id);
  }
}
