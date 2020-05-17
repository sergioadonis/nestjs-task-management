import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    const status = value.toUpperCase();

    if (!this.isValidStatus(status))
      throw new BadRequestException(`${value} is not a valid status.`);

    return status;
  }

  private isValidStatus(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx >= 0;
  }
}
