import { Expose } from "class-transformer";

export class StatusDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
}
