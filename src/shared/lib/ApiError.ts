interface ApiErrorOptions {
  code?: number;
  message?: string;
  status?: number;
}

export class ApiError extends Error {
  code?: number;
  status?: number;

  constructor({ code, message = "Có lỗi xảy ra.", status }: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}
