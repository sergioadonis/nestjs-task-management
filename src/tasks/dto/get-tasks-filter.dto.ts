import { TaskStatus } from '../task.model';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetTasksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @Transform(value => value.toUpperCase())
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
}
