import { HttpException } from '@nestjs/common';

export abstract class BaseController {
  created<T>(data: T) {
    return {
      status: 'created',
      data: data,
    };
  }
  ok<T>(data: T) {
    return {
      status: 'created',
      data: data,
    };
  }
  error(error: unknown, message: string) {
    console.log(error);
    throw new HttpException({ status: 'error', message: message }, 400);
  }
}
