import { Reflector } from "@nestjs/core";
import { Access } from "generated/prisma";

export const Accesses = Reflector.createDecorator<Access[]>();
