import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "generated/prisma";

export class CreateMembershipDto {

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(Role, { each: true })
  roles: Role[];
}
