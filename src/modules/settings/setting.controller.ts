import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { QueryRequest } from 'src/helpers/query.request'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import {
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from 'src/modules/auth'
import { CreateSettingRequestDto } from './dtos/create-setting-request.dto'
import { UpdateSettingRequestDto } from './dtos/update-setting-request.dto'
import { SettingService } from './setting.service'

@ApiTags('Settings Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('settings')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiOperation({
    summary: 'Create new setting',
    description:
      '`type` must be in `BANNER_HOME`, `BANNER_CARD`, `BANNER_GIFT`, `ADS_HOME`, `ADS_GIFT_OCCASION`, `ADS_GIFT_FOR`, `ADS_CARD_OCCASION`, `ADS_CARD_FOR`'
  })
  @Post()
  public create(@Body(ValidationPipe) dto: CreateSettingRequestDto) {
    return this.settingService.create(dto)
  }

  @ApiOperation({ description: 'Get list settings' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"q":"Card","type":"GIFT","category_id":1}'
  })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @Get()
  public get(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.settingService.get(pagination)
  }

  @ApiOperation({ description: 'Get setting by id' })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  public getById(@Param() params) {
    return this.settingService.getById(params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update setting' })
  @Patch(':id')
  public update(
    @Param() params,
    @Body(ValidationPipe) dto: UpdateSettingRequestDto
  ) {
    return this.settingService.update(params.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Delete setting' })
  @Delete(':id')
  public delete(@Param() params) {
    return this.settingService.delete(params.id)
  }

  @ApiOperation({ description: 'Get VietNam cities' })
  @Get('/vietnam-address/cities')
  public getVietNamCities() {
    return this.settingService.getVietNamCities()
  }

  @ApiOperation({ description: 'Get VietNam districts' })
  @ApiQuery({ name: 'cityCode', required: false })
  @Get('/vietnam-address/districts')
  public getVietNamDistricts(@Query() query) {
    const { cityCode } = query
    return this.settingService.getVietNamDistricts(cityCode)
  }

  @ApiOperation({ description: 'Get VietNam wards' })
  @ApiQuery({ name: 'districtCode', required: false })
  @Get('/vietnam-address/wards')
  public getVietNamWards(@Query() query) {
    const { districtCode } = query
    return this.settingService.getVietNamWards(districtCode)
  }
}
