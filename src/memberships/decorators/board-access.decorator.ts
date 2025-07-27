import { Reflector } from "@nestjs/core";
import { Role } from "generated/prisma";

export const BoardAccesses = Reflector.createDecorator<Role>();
