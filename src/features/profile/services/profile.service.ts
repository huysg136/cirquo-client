import { request } from "../../../shared/api/httpClient";
import type {
  ChangePasswordValues,
  UpdateProfileValues,
  UserProfile,
} from "../types/profile.types";

export function getUserProfile(): Promise<UserProfile> {
  return request<UserProfile>("/profile");
}

export function updateUserProfile(
  values: UpdateProfileValues,
): Promise<UserProfile> {
  return request<UserProfile>("/profile", {
    method: "PUT",
    body: values,
  });
}

export function changeUserPassword(values: ChangePasswordValues): Promise<void> {
  return request<void>("/auth/password", {
    method: "PATCH",
    body: values,
  });
}
