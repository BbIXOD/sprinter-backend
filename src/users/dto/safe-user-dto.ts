import { Expose } from "class-transformer";

export class SafeUserDto {
  @Expose()
  id: String;

  @Expose()
  email: String;

  @Expose()
  name: String;
}
