import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post('')
  // @UsePipes(new ValidationPipe())
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createTask(@Body() createTaskDto: CreateTaskDto) {
    // console.log(createTaskDto);
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('')
  getAllTasks() {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    console.log('in Task Controller', id, typeof id);
    return this.tasksService.getOneTask(id);
  }

  @Put('/:id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateTaskDto,) {
    console.log('in Task Controller', id, typeof id);
    return this.tasksService.updateTask(id, updateData);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
