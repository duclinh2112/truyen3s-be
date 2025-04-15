import { ApiGlobalResponse } from '@common/decorators'
import { MessageResponse } from '@common/interceptors/message.response'
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { CreateUserRequestDto, UserResponseDto } from '../users/dtos'
import { EmailRequestDto } from '../users/dtos/refresh-verify.request.dto'
import { ResetPasswordRequestDto } from '../users/dtos/reset-password.request.dto'
import { VerifyCodeResetRequestDto } from '../users/dtos/verify-code-reset.request.dto'
import { UserEntity } from '../users/entities/user.entity'
import { TOKEN_NAME } from './constants'
import { CurrentUser } from './decorators'
import {
  AuthCredentialsRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  TokenDto,
  ValidateTokenRequestDto,
  ValidateTokenResponseDto
} from './dtos'
import { RefreshVerifyAccountResponseDto } from './dtos/refresh-verify-account.response.dto'
import { VerifyAccountRequestDto } from './dtos/verify-account.request.dto'
import { VerifyAccountResponseDto } from './dtos/verify-account.response.dto'
import { JwtAuthGuard } from './guards'
import { AuthService, TokenService } from './services'
import { UpdateAccountRequestDto } from '../users/dtos/update-account.request.dto'
import { ChangePasswordDto } from '../users/dtos/change-password.dto'
import { CreateUserFromProviderDto } from '../users/dtos/create-user-from-provider.dto'

@ApiTags('Auth')
@ApiBearerAuth(TOKEN_NAME)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('login')
  login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsRequestDto
  ): Promise<LoginResponseDto> {
    return this.authService.login(authCredentialsDto)
  }

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('login-provider')
  loginProvider(
    @Body(ValidationPipe) userProviderDto: CreateUserFromProviderDto
  ): Promise<LoginResponseDto> {
    return this.authService.loginProvider(userProviderDto)
  }

  @ApiOperation({ description: 'User Register' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiConflictResponse({ description: 'User already exists' })
  @Post('register')
  public register(
    @Body(ValidationPipe) userDto: CreateUserRequestDto
  ): Promise<UserResponseDto> {
    return this.authService.register(userDto)
  }

  @Post('reset-password/send-code')
  public sendCodeResetPassword(
    @Body() emailDto: EmailRequestDto
  ): Promise<MessageResponse> {
    return this.authService.sendCodeResetPassword(emailDto)
  }

  @Post('reset-password/verify')
  public verifyCodeResetPassword(
    @Body() resetPasswordDto: VerifyCodeResetRequestDto
  ): Promise<MessageResponse> {
    return this.authService.verifyCodeResetPassword(resetPasswordDto)
  }

  @Post('reset-password')
  public resetPassword(
    @Body() resetPasswordDto: ResetPasswordRequestDto
  ): Promise<UserResponseDto> {
    return this.authService.resetPassword(resetPasswordDto)
  }

  @ApiOperation({ description: 'Renew access in the application' })
  @ApiOkResponse({ description: 'token successfully renewed' })
  @ApiUnauthorizedResponse({
    description: 'Refresh token invalid or expired'
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('token/refresh')
  getNewToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenRequestDto
  ): TokenDto {
    const { refreshToken } = refreshTokenDto
    return this.tokenService.generateRefreshToken(refreshToken)
  }

  @ApiOperation({ description: 'Validate token' })
  @ApiOkResponse({ description: 'Validation was successful' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('token/validate')
  validateToken(
    @Body(ValidationPipe) validateToken: ValidateTokenRequestDto
  ): Promise<ValidateTokenResponseDto> {
    const { token } = validateToken
    return this.tokenService.validateToken(token)
  }

  @Get('token/verify')
  verifyAccount(
    @Query() query: VerifyAccountRequestDto,
    @Res() res
  ): Promise<VerifyAccountResponseDto> {
    return this.tokenService.verifyAccount(query, res)
  }

  @Post('token/verify-refresh')
  refreshVerifyAccount(
    @Body() dto: EmailRequestDto
  ): Promise<RefreshVerifyAccountResponseDto> {
    return this.authService.refreshVerifyAccount(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('account-info')
  getAccountAccount(@CurrentUser() user: UserEntity): Promise<UserResponseDto> {
    return this.authService.getAccountInfo(user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update account' })
  @Patch('account')
  public updateUserById(
    @Body(ValidationPipe) dto: UpdateAccountRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<UserResponseDto> {
    return this.authService.updateAccount(dto, user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change password' })
  @Patch('change-password')
  public changePassword(
    @Body(ValidationPipe) dto: ChangePasswordDto,
    @CurrentUser() user: UserEntity
  ): Promise<UserResponseDto> {
    return this.authService.changePassword(dto, user)
  }
}
