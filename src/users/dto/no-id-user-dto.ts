import { Expose } from "class-transformer"

export class NoIdUserDto {
  @Expose()
  email: string
  @Expose()
  name: string
  @Expose()
  password: string
}
