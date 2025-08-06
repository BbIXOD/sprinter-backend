import { Expose } from "class-transformer";

export class TaskDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  size: number;
  @Expose()
  priority: number;
  @Expose()
  statusId: string;
  @Expose()
  sprintId?: string;
  @Expose()
  userIds: string[];
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}
