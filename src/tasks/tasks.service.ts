import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 0;

  createTask(createTaskDto: CreateTaskDto) {
    const task = {
      id: this.idCounter++,
      ...createTaskDto,
    };
    this.tasks.push(task);
    return { message: true, data: task };
  }

  getTasks() {
    return { message: true, data: this.tasks };
  }

  getOneTask(id: number) {
    console.log('in TaskService', id, typeof id);
    const task = this.tasks.find((task) => Number(task.id) === id);
    console.log('task', task);
    console.log('tasks', this.tasks);
    if (task) {
      return { message: true, data: task };
    }
    return { message: false, data: null };
  }

  updateTask(id: number, updateData: UpdateTaskDto) {
    console.log('in TaskService', id, typeof id);
    const index = this.tasks.findIndex((task) => task.id === id);
    console.log('index', index);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updateData };
      return { message: true, data: this.tasks[index] };
    } else {
      return { message: false, data: null };
    }
  }

  delete(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    console.log('index', index);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return { message: true, data: this.tasks[index] };
    } else {
      return { message: false, data: null };
    }
  }
}

// mongodb://localhost:27017/ProjectManagerAPI
