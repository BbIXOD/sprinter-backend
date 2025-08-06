import { Expose } from "class-transformer"
import { Access } from "generated/prisma"

export class NoIdUserDto {
  @Expose()
  email: string
  @Expose()
  name: string
  @Expose()
  password: string
}
