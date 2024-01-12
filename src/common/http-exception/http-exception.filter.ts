import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { message: string | string[] };

    if (typeof error === 'string') {
      response.status(status).json({
        status: status,
        message: '서버에 문제가 발생했습니다.',
        errors: error,
      });
    } else {
      response.status(status).json({
        status: status,
        message: '서버에 문제가 발생했습니다.',
        errors: error.message,
      });
    }
  }
}
