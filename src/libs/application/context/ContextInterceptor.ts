/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { v4 as uuid } from 'uuid';
import { Request, NextFunction, Response } from 'express';
import { RequestContextService } from './AppRequestContext';

export function ContextInterceptor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /**
   * Setting an ID in the global context for each request.
   * This ID can be used as correlation id shown in logs
   */
  const requestId = req?.headers?.['requestId'] || uuid();

  RequestContextService.setRequestId(requestId);

  next();
}
