import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TokenPayLoad = {
  id: number;
};

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayLoad => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
