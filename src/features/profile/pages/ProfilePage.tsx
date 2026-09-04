import { KeyOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Card, Flex, Form, Input, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";

import { HomeHeader } from "../../home/components/HomeHeader";
import { getErrorMessage } from "../../../shared/config/errorMessages";
import { useAuthStore } from "../../auth/store/auth.store";
import { changeUserPassword, getUserProfile, updateUserProfile } from "../services/profile.service";
import type {
  ChangePasswordValues,
  UpdateProfileValues,
  UserProfile,
} from "../types/profile.types";
import "../styles/profile.scss";

const PHONE_PATTERN = /^0[35789]\d{8}$/;

function toProfileFormValues(profile: UserProfile): UpdateProfileValues {
  return { ...profile, phone: profile.phone ?? undefined };
}

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { message: messageApi } = AntdApp.useApp();
  const [profileForm] = Form.useForm<UpdateProfileValues>();
  const [passwordForm] = Form.useForm<ChangePasswordValues>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (!user || !accessToken) return;

    const fallbackProfile: UserProfile = {
      id: user.id,
      email: user.email,
      fullName: user.fullName ?? "",
      phone: user.phone ?? null,
    };

    getUserProfile(user.id, accessToken)
      .then((profile) => profileForm.setFieldsValue(toProfileFormValues(profile)))
      .catch((error) => {
        profileForm.setFieldsValue(toProfileFormValues(fallbackProfile));
        messageApi.error(getErrorMessage(error));
      })
      .finally(() => setIsLoading(false));
  }, [accessToken, messageApi, profileForm, user]);

  async function handleProfileSubmit(values: UpdateProfileValues): Promise<void> {
    if (!user || !accessToken) return;

    setIsSavingProfile(true);
    try {
      const profile = await updateUserProfile(user.id, values, accessToken);
      updateUser({ ...user, ...profile });
      messageApi.success("Đã cập nhật thông tin cá nhân.");
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(values: ChangePasswordValues): Promise<void> {
    if (!user || !accessToken) return;

    setIsSavingPassword(true);
    try {
      await changeUserPassword(user.id, values, accessToken);
      passwordForm.resetFields();
      messageApi.success("Đã cập nhật mật khẩu.");
    } catch (error) {
      messageApi.error(getErrorMessage(error));
    } finally {
      setIsSavingPassword(false);
    }
  }

  return (
    <div className="profile-page">
      <HomeHeader />
      <main className="profile-container">
        <Flex vertical gap={6} className="profile-heading">
          <Typography.Title level={2}>Thông tin cá nhân</Typography.Title>
          <Typography.Text type="secondary">
            Quản lý thông tin tài khoản và mật khẩu của bạn.
          </Typography.Text>
        </Flex>

        {isLoading ? (
          <Card className="profile-card">
            <Skeleton active paragraph={{ rows: 7 }} />
          </Card>
        ) : (
          <Flex vertical gap={20}>
            <Card
              className="profile-card"
              title={
                <>
                  <UserOutlined /> Thông tin tài khoản
                </>
              }
            >
              <Form form={profileForm} layout="vertical" onFinish={handleProfileSubmit}>
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên." },
                    { max: 100, message: "Họ và tên không được quá 100 ký tự." },
                  ]}
                >
                  <Input autoComplete="name" placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email." },
                    { type: "email", message: "Email không đúng định dạng." },
                    { max: 255, message: "Email không được quá 255 ký tự." },
                  ]}
                >
                  <Input autoComplete="email" placeholder="you@gmail.com" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { pattern: PHONE_PATTERN, message: "Số điện thoại chưa đúng định dạng." },
                  ]}
                >
                  <Input autoComplete="tel" placeholder="Không bắt buộc" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={isSavingProfile}
                >
                  Lưu thay đổi
                </Button>
              </Form>
            </Card>

            <Card
              className="profile-card"
              title={
                <>
                  <KeyOutlined /> Đổi mật khẩu
                </>
              }
            >
              <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSubmit}>
                <Form.Item
                  name="currentPassword"
                  label="Mật khẩu hiện tại"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu hiện tại." },
                    { max: 72, message: "Mật khẩu không được quá 72 ký tự." },
                  ]}
                >
                  <Input.Password
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="Mật khẩu mới"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới." },
                    { min: 8, max: 72, message: "Mật khẩu mới phải có từ 8 đến 72 ký tự." },
                  ]}
                >
                  <Input.Password autoComplete="new-password" placeholder="Nhập mật khẩu mới" />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  label="Xác nhận mật khẩu mới"
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu mới." },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        return !value || getFieldValue("newPassword") === value
                          ? Promise.resolve()
                          : Promise.reject(new Error("Mật khẩu xác nhận không khớp."));
                      },
                    }),
                  ]}
                >
                  <Input.Password autoComplete="new-password" placeholder="Nhập lại mật khẩu mới" />
                </Form.Item>
                <Button htmlType="submit" icon={<KeyOutlined />} loading={isSavingPassword}>
                  Cập nhật mật khẩu
                </Button>
              </Form>
            </Card>
          </Flex>
        )}
      </main>
    </div>
  );
}
