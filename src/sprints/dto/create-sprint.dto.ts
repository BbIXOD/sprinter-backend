import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsString, } from "class-validator";

export class CreateSprintDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date
}
