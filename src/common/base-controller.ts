export abstract class BaseController {
  ok<T>(data: T) {
    return {
      status: 'created',
      data: data,
    };
  }
  response<T>(data: T) {
    return {
      status: 'created',
      data: data,
    };
  }
  error(message: string) {
    return {
      status: 'error',
      message: message,
    };
  }
}
