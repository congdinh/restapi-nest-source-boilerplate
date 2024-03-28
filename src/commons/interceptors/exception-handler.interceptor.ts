import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ExceptionHandlerInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        catchError((errors) => {
          try {
            if (errors?.name?.includes('Exception')) {
              // console.error(errors);
              return throwError(() => errors);
            }
            const current = new Date();
            const req = context.switchToHttp().getRequest();
            const request = {
              user: req?.user,
              body: req?.body,
              params: req?.params,
              query: req?.query,
            };
            const _errors = {
              name: errors?.name,
              message: errors?.message,
              stack: errors?.stack,
            };
            const payload = {
              timestamp: current,
              request,
              method: req.method,
              url: req.originalUrl,
              errors: Object.values(_errors)?.length ? _errors : errors,
            };
            console.error('ExceptionHandler: ', payload);
            return throwError(() => errors);
          } catch (err) {
            return throwError(() => errors);
          }
        }),
      )
      .pipe(
        map((data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'success',
          data,
        })),
      );
  }
}
