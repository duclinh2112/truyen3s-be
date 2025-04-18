export enum ErrorType {
  // Common
  INTERNAL_SERVER = 'INTERNAL_SERVER',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  NOT_FOUND = 'NOT_FOUND',
  VALID_NUMBER = 'VALID_NUMBER',
  ID_NOT_EMPTY = 'ID_NOT_EMPTY',
  ID_NOT_FOUND = 'ID_NOT_FOUND',
  INVALID_ACTIVE = 'INVALID_ACTIVE',
  ID_ARRAY = 'ID_ARRAY',
  INVALID_ID = 'INVALID_ID',
  // Auth
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  SOURCE_TOKEN_EXPIRED = 'SOURCE_TOKEN_EXPIRED',
  VERIFY_TOKEN_ERROR = 'VERIFY_TOKEN_ERROR',
  ACTIVATED_EMAIL = 'ACTIVATED_EMAIL',
  BLOCKED_EMAIL = 'BLOCKED_EMAIL',
  PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
  PASSWORD_INVALID = 'PASSWORD_INVALID',
  // User
  USER_EXISTS = 'USER_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  EMAIL_NOT_EMPTY = 'EMAIL_NOT_EMPTY',
  VERIFY_CODE_RESET_PASS_NOT_EMPTY = 'VERIFY_CODE_RESET_PASS_NOT_EMPTY',
  CODE_EXPIRED = 'CODE_EXPIRES',
  INVALID_CODE = 'INVALID_CODE',
  VERIFY_CODE_RESET = 'VERIFY_CODE_RESET',
  PHONE_EXISTS = 'PHONE_EXISTS',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  // Role
  ROLE_DOES_NOT_EXISTS = 'ROLE_DOES_NOT_EXISTS',
  BLOCKED_USER = 'BLOCKED_USER',
  INACTIVE_USER = 'INACTIVE_USER',
  EMAIL_PHONE_NOT_EMPTY = 'EMAIL_PHONE_NOT_EMPTY',
  PermissionExists = 'PERMISSION_EXISTS',
  RoleExists = 'ROLE_EXISTS',
  InvalidCurrentPassword = 'INVALID_CURRENT_PASSWORD',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  ForeignKeyConflict = 'FOREIGN_KEY_CONFLICT',
  // Assets
  PHOTO_NOT_FOUND = 'PHOTO_NOT_FOUND',
  SCREEN_SHOTS_NOT_FOUND = 'SCREEN_SHOTS_NOT_FOUND',
  // Products
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  // Category
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  // Coupon
  COUPON_FAIL = 'COUPON_FAIL',
  // Order
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  NOTIFICATION_NOT_FOUND = 'NOTIFICATION_NOT_FOUND',

  //Provider
  PROVIDER_ACCOUNT_ID_NOT_EMPTY = 'PROVIDER_ACCOUNT_ID_NOT_EMPTY',
  PROVIDER_NOT_EMPTY = 'PROVIDER_NOT_EMPTY'
}
