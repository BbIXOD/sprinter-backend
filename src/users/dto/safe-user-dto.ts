import { Expose } from "class-transformer";

export class SafeUserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
}
