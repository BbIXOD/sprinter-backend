import { Expose } from "class-transformer";

export class SprintDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  startDate: string;
  @Expose()
  endDate: string;
}
