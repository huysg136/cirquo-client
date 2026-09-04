import type { AuthSession } from "../../features/auth/types/auth.types";
import { getAuthRuntime } from "../../features/auth/lib/authRuntime";
import { env } from "../config/env";
import { ApiError } from "../lib/ApiError";

const AUTHENTICATION_REQUIRED_CODE = 1106;

interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  hasRetried?: boolean;
  skipAuthRefresh?: boolean;
};

let refreshPromise: Promise<AuthSession> | null = null;

async function refreshCurrentSession(): Promise<AuthSession> {
  const authRuntime = getAuthRuntime();
  const refreshToken = authRuntime.getRefreshToken();

  if (!refreshToken) {
    authRuntime.logout();
    throw new ApiError({
      code: 1102,
      status: 401,
      message: "Phiên đăng nhập đã hết hạn.",
    });
  }

  if (!refreshPromise) {
    refreshPromise = request<AuthSession>("/auth/refresh", {
      method: "POST",
      body: { refreshToken },
      skipAuthRefresh: true,
    })
      .then((session) => {
        authRuntime.setSession(session);
        return session;
      })
      .catch((error: unknown) => {
        authRuntime.logout();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, hasRetried = false, skipAuthRefresh = false, ...requestOptions } = options;
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Content-Type", "application/json");

  if (!skipAuthRefresh) {
    const accessToken = getAuthRuntime().getAccessToken();

    if (accessToken) {
      requestHeaders.set("Authorization", `Bearer ${accessToken}`);
    }
  }

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

  if (
    response.status === 401 &&
    payload?.code === AUTHENTICATION_REQUIRED_CODE &&
    !hasRetried &&
    !skipAuthRefresh
  ) {
    try {
      await refreshCurrentSession();

      return request<T>(path, {
        ...options,
        hasRetried: true,
      });
    } catch (error) {
      getAuthRuntime().logout();
      window.location.replace("/dang-nhap");
      throw error;
    }
  }

  if (!response.ok) {
    throw new ApiError({
      code: payload?.code,
      message: payload?.message,
      status: response.status,
    });
  }

  return payload?.result as T;
}
