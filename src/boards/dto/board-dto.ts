import { Expose } from "class-transformer";

export class BoardDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}
