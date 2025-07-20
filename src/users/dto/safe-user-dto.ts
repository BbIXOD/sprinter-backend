import { Expose } from "class-transformer";
import { Access } from "generated/prisma";

export class SafeUserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  access: Access;
}
