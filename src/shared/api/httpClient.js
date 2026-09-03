import { env } from "../config/env";
import { ApiError } from "../lib/ApiError";

export async function request(path, options = {}) {
  const { body, headers, ...requestOptions } = options;

  let response;
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...requestOptions,
      headers: { "Content-Type": "application/json", ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError({ message: "Không thể kết nối đến máy chủ." });
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError({
      code: payload?.code,
      message: payload?.message,
      status: response.status,
    });
  }

  return payload?.result;
}
