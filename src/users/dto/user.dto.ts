import { Expose } from "class-transformer"
import { Access } from "generated/prisma"

export class UserDto {
  @Expose()
  id: string 
  @Expose()
  email: string
  @Expose()
  name: string
  @Expose()
  password: string
  @Expose()
  access: Access
}
