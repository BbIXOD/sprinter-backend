import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../../generated/prisma';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.mapErrorCodeToStatus(exception.code);
    const message = this.formatMessage(exception);

    response.status(status).json({
      statusCode: status,
      error: 'Database Error',
      message,
    });
  }

  private mapErrorCodeToStatus(code: string): HttpStatus {
    switch (code) {
      case 'P2002': // Unique constraint failed
        return HttpStatus.CONFLICT;
      case 'P2025': // Record not found
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.BAD_REQUEST;
    }
  }

  private formatMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string {
    switch (exception.code) {
      case 'P2002':
        return `Unique constraint failed: ${exception.meta?.target || 'No extra details.'}`;
      case 'P2025':
        return `Record not found: ${exception.meta?.cause || 'No extra details.'}`;
      default:
        return exception.message;
    }
  }
}
