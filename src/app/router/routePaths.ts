const ADMIN_BASE_PATH = "/admin";

export const ROUTES = Object.freeze({
  PUBLIC: { HOME: "/", MAINTENANCE: "/bao-tri", CART: "/gio-hang" },
  USER: { LOGIN: "/dang-nhap", PROFILE: "/ho-so", ADDRESSES: "/dia-chi", ORDERS: "/don-hang" },
  ADMIN: {
    DASHBOARD: ADMIN_BASE_PATH,
    USERS: `${ADMIN_BASE_PATH}/users`,
    PRODUCTS: `${ADMIN_BASE_PATH}/products`,
    ORDERS: `${ADMIN_BASE_PATH}/orders`,
  },
  CATEGORY: {
    IPHONE: `/iphone`,
    MAC: `/mac`,
    IPAD: `/ipad`,
    WATCH: `/watch`,
    HEADPHONES: `/tai-nghe-loa`,
    ACCESSORIES: `/phu-kien`,
  },
});