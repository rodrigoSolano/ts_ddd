/**
 * Setting some isolated context for each request.
 */

import { request } from 'express';

export class AppRequestContext {
  requestId: string;
  // transactionConnection?: DatabaseTransactionConnection; // For global transactions
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    // get context from express request
    const requestId = request.headers['requestId'] as string;
    const ctx: AppRequestContext = {
      requestId: requestId,
    };
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }
}
