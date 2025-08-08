import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

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

  @ValidateIf((o) => o.sprintId !== null && o.sprintId !== undefined)
  @IsString()
  @IsOptional()
  sprintId?: string | null

  @IsString()
  @IsNotEmpty()
  statusId: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  userIds: string[]
}
