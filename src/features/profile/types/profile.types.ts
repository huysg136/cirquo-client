export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
}

export interface UpdateProfileValues {
  email: string;
  fullName: string;
  phone?: string;
}

export interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
