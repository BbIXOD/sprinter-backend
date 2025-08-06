import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @IsInt()
  @IsNotEmpty()
  size: number

  @IsInt()
  @IsNotEmpty()
  priority: number

  @IsString()
  sprintId: string

  @IsString()
  @IsNotEmpty()
  statusId: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  userIds: string[]
}
