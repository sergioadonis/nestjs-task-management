import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.tasks;

    if (status) tasks = tasks.filter(task => task.status === status.toUpperCase());

    if (search)
      tasks = tasks.filter(
        tasks =>
          tasks.title.includes(search) || tasks.description.includes(search),
      );

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) throw new NotFoundException(`Task with ID "${id}" not found.`);

    return task;
  }

  createTask(taskDto: CreateTaskDto): Task {
    const { title: title, description: description } = taskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
