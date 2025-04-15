export enum ErrorMessage {
  // Common
  INTERNAL_SERVER = 'Có lỗi xảy ra, vui lòng thử lại sau!',
  REQUEST_TIMEOUT = 'Hết thời gian truy cập',
  NOT_FOUND = 'Không tìm thấy!',
  VALID_NUMBER = 'ID phải là số hợp lệ!',
  ID_NOT_EMPTY = 'ID không được để trống!',
  ID_NOT_FOUND = 'Không tìm thấy ID!',
  INVALID_ACTIVE = 'Invalid active status',
  ID_ARRAY = 'Id must be an array',
  INVALID_ID = 'Invalid id',
  NOT_EMPTY = 'Value should not be empty',
  // Auth
  UNAUTHORIZED = 'Unauthorized',
  INVALID_TOKEN = 'Invalid token',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  SOURCE_TOKEN_EXPIRED = 'Vui lòng truy cập vào website để tải lại bộ source',
  VERIFY_TOKEN_ERROR = 'Vui lòng thử lại.',
  ACTIVATED_EMAIL = 'Email đã được xác thực.',
  BLOCKED_EMAIL = 'Email has been blocked',
  PASSWORD_INVALID = 'Mật khẩu không chính xác',
  PASSWORD_NOT_MATCH = 'Mật khẩu không khớp',
  // User
  USER_NOT_FOUND = 'User not found!',
  EMAIL_NOT_FOUND = 'Email not found!',
  EMAIL_NOT_EMPTY = 'Email should not be empty!',
  VERIFY_CODE_RESET_PASS_NOT_EMPTY = 'Code should not be empty!',
  CODE_EXPIRED = 'Verify code has expired',
  INVALID_CODE = 'Invalid verify code',
  VERIFY_CODE_RESET = 'Please verify code reset password',
  STATUS_REGEX = 'Status is invalid',
  PHONE_EXISTS = 'Phone already exists!',
  EMAIL_EXISTS = 'Email already exists!',
  // Role
  ROLE_DOES_NOT_EXISTS = 'Role does not exists!',
  // Register
  FULL_NOT_EMPTY = 'fullName should not be empty',
  fullName_MAX_LENGTH = 'fullName must be shorter than or equal to 100 characters',
  BIRTHDAY_NOT_EMPTY = 'Birthday should not be empty',
  BIRTHDAY_STRING = 'Birthday must be a valid ISO 8601 date string',
  PHONE_NOT_EMPTY = 'Phone should not be empty',
  PHONE_REGEX = 'Phone must match',
  EMAIL_VALID = 'Email must be an email',
  PASSWORD_REGEX = 'Password too weak',
  PASSWORD_NOT_EMPTY = 'Password should not be empty',
  PASSWORD_LENGTH = 'Password must be longer than or equal to 6 characters',
  EMAIL_PHONE_NOT_EMPTY = 'Email or phone should not be empty',
  // Role
  ROLE_EXISTS = 'Role already exists!',
  // Products
  NAME_MAX_LENGTH = 'Name must be shorter than or equal to 200 characters',
  PRODUCT_NOT_FOUND = 'Product not found',
  PRODUCT_SIZE_TYPE = 'Type must be E_CARD, STANDARD_CARD, LARGE_CARD or GIANT_CARD',
  // Category
  CATEGORY_NOT_FOUND = 'Category not found',
  TYPE_ENUM = 'Type must be GIFT or CARD',
  FILTER_TYPE_ENUM = 'Filter Type must be FOR_YOU or ON_OCCASION',
  // Assets
  PHOTO_NOT_FOUND = 'Image not found',
  SCREEN_SHOTS_NOT_FOUND = 'Screenshots not found',
  IMAGE_NOT_EMPTY = 'Image should not be empty',
  // Coupon
  COUPON_FAIL = 'Coupon is incorrect or expired',
  // Order
  ORDER_NOT_FOUND = 'Order not found!',
  ORDER_PAID = 'Đơn hàng đã được thanh toán',
  // Setting
  SETTING_TYPE_ENUM = 'Type must be BANNER_HOME, BANNER_CARD, BANNER_GIFT, ADS_HOME, ADS_GIFT_OCCASION, ADS_GIFT_FOR, ADS_CARD_OCCASION, ADS_CARD_FOR',
  // Wishlist
  WISHLIST_NOT_FOUND = 'Wishlist not found',
  // Notification
  NOTIFICATION_NOT_FOUND = 'Không tìm thấy thông báo',

  //Provider
  PROVIDER_ACCOUNT_ID_NOT_EMPTY = 'Provider id not empty',
  PROVIDER_NOT_EMPTY = 'Provider not empty'
}
