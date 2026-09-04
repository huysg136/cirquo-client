import { request } from "../../../shared/api/httpClient";
import type {
  ChangePasswordValues,
  UpdateProfileValues,
  UserProfile,
} from "../types/profile.types";

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export function getUserProfile(userId: string, accessToken: string): Promise<UserProfile> {
  return request<UserProfile>(`/users/${userId}`, { headers: authHeaders(accessToken) });
}

export function updateUserProfile(
  userId: string,
  values: UpdateProfileValues,
  accessToken: string,
): Promise<UserProfile> {
  return request<UserProfile>(`/users/${userId}`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: values,
  });
}

export function changeUserPassword(
  userId: string,
  values: ChangePasswordValues,
  accessToken: string,
): Promise<void> {
  return request<void>(`/auth/users/${userId}/password`, {
    method: "PATCH",
    headers: authHeaders(accessToken),
    body: values,
  });
}
