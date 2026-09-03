import { env } from "../config/env";
import { ApiError } from "../lib/ApiError";

interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...requestOptions } = options;
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Content-Type", "application/json");

  let response: Response;
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...requestOptions,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({ message: "Không thể kết nối đến máy chủ." });
  }

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok) {
    throw new ApiError({
      code: payload?.code,
      message: payload?.message,
      status: response.status,
    });
  }

  return payload?.result as T;
}
