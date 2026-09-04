import { ApiError } from "../lib/ApiError";

const ERROR_MESSAGES: Record<number, string> = {
  1001: "Dữ liệu nhập vào chưa hợp lệ.",
  1002: "Yêu cầu không hợp lệ. Vui lòng thử lại.",
  1003: "Email này đã được sử dụng.",
  1004: "Không tìm thấy người dùng.",
  1006: "Email hoặc mật khẩu không chính xác.",
  1007: "Tài khoản của bạn hiện không hoạt động.",
  1008: "Tài khoản của bạn đã bị cấm.",
  1009: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  1010: "Mật khẩu mới phải khác mật khẩu hiện tại.",
  1011: "Mật khẩu xác nhận không khớp.",
  1012: "Mật khẩu hiện tại không chính xác.",
  9999: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.",
};

const DEFAULT_ERROR_MESSAGE = "Có lỗi xảy ra. Vui lòng thử lại.";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (typeof error.code === "number") {
      return ERROR_MESSAGES[error.code] ?? error.message;
    }

    return error.message;
  }

  return DEFAULT_ERROR_MESSAGE;
}
