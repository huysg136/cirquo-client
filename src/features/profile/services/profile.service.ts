import { request } from "../../../shared/api/httpClient";
import type {
  ChangePasswordValues,
  UpdateProfileValues,
  UserProfile,
} from "../types/profile.types";

export function getUserProfile(userId: string): Promise<UserProfile> {
  return request<UserProfile>(`/users/${userId}`);
}

export function updateUserProfile(
  userId: string,
  values: UpdateProfileValues,
): Promise<UserProfile> {
  return request<UserProfile>(`/users/${userId}`, {
    method: "PUT",
    body: values,
  });
}

export function changeUserPassword(userId: string, values: ChangePasswordValues): Promise<void> {
  return request<void>(`/auth/users/${userId}/password`, {
    method: "PATCH",
    body: values,
  });
}
