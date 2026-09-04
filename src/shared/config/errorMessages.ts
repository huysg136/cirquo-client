import { ApiError } from "../lib/ApiError";

const ERROR_MESSAGES: Record<number, string> = {
  1001: "Thông tin nhập chưa đúng định dạng.",
  1002: "Yêu cầu không hợp lệ. Vui lòng thử lại.",
  1099: "Đã có lỗi hệ thống. Vui lòng thử lại sau.",
  1101: "Email hoặc mật khẩu không chính xác.",
  1102: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  1103: "Mật khẩu mới phải khác mật khẩu hiện tại.",
  1104: "Mật khẩu xác nhận không khớp.",
  1105: "Mật khẩu hiện tại không chính xác.",
  1201: "Email này đã được sử dụng.",
  1202: "Không tìm thấy người dùng.",
  1203: "Tài khoản của bạn hiện không hoạt động.",
  1204: "Tài khoản của bạn đã bị cấm.",
  1301: "Không tìm thấy địa chỉ nhận hàng.",
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
