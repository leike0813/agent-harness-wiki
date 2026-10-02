import {
  consumerErrorSchema,
  type ConsumerErrorCode,
} from "../domain/consumer.js";

export class OnlineError extends Error {
  readonly retryable: boolean;
  readonly releaseId: string | undefined;
  readonly httpStatus: number | undefined;
  constructor(
    readonly code: ConsumerErrorCode,
    reason: string,
    options: {
      retryable?: boolean;
      releaseId?: string | undefined;
      httpStatus?: number | undefined;
    } = {},
  ) {
    super(reason);
    this.name = "OnlineError";
    this.retryable = options.retryable ?? false;
    this.releaseId = options.releaseId;
    this.httpStatus = options.httpStatus;
  }
}

export function onlineErrorResult(error: unknown, releaseId?: string) {
  const failure =
    error instanceof OnlineError
      ? error
      : new OnlineError(
          "invalid_release_data",
          "Published data could not be read.",
          { releaseId },
        );
  return consumerErrorSchema.parse({
    status: "error",
    ...((failure.releaseId ?? releaseId)
      ? { release_id: failure.releaseId ?? releaseId }
      : {}),
    error: {
      code: failure.code,
      reason: failure.message,
      retryable: failure.retryable,
      ...(failure.httpStatus !== undefined
        ? { http_status: failure.httpStatus }
        : {}),
    },
  });
}
