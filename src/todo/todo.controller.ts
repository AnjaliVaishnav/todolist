import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { toPromise } from 'src/shared/utils';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll() {
    const todos = await this.todoService.findAll();
    return toPromise({ todos });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
