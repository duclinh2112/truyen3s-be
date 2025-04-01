import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { AssetsMapper } from '../assets/assets.mapper'
import { AssetsRepository } from '../assets/assets.repository'
import { CreateSettingRequestDto } from './dtos/create-setting-request.dto'
import { UpdateSettingRequestDto } from './dtos/update-setting-request.dto'
import { SettingMapper } from './setting.mapper'
import { SettingRepository } from './setting.repository'
import * as fs from 'fs'
import { isEmpty } from 'lodash'

function jsonReader(filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  if (data) {
    return JSON.parse(data)
  }
  return []
}

@Injectable()
export class SettingService {
  constructor(
    private settingRepository: SettingRepository,
    private assetsRepository: AssetsRepository,
    private configService: ConfigService
  ) {}

  public async create(dto: CreateSettingRequestDto) {
    try {
      const { actions = [] } = dto || {}
      let entity = await SettingMapper.toCreate(dto)
      entity = await this.settingRepository.save(entity)
      entity.image = await this.assetsRepository.findOne(dto.image)
      const actionData = await Promise.all(
        actions.map(async (action) => {
          const img = await this.assetsRepository.findOne(action.image)
          const imgResponse = AssetsMapper.toDto(img, this.configService)
          return {
            ...action,
            image: imgResponse
          }
        })
      )
      return SettingMapper.toDto(entity, actionData, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async get(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.settingRepository.getAndCount(pagination)
      const data = await Promise.all(
        list.map(async (item) => {
          const { image, actions } = item || {}
          const newActions = await Promise.all(
            (actions || []).map(async (action) => {
              const img = await this.assetsRepository.findOne(action.image)
              if (img) {
                const imgResponse = AssetsMapper.toDto(img, this.configService)
                return {
                  ...action,
                  image: imgResponse
                }
              }
              return action
            })
          )
          if (image) {
            const photoData = AssetsMapper.toDto(image, this.configService)
            return { ...item, image: photoData, actions: newActions }
          }
          return { ...item, actions: newActions }
        })
      )
      return Pagination.of(pagination, count, data)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getById(id: number) {
    const setting = await this.settingRepository.getById(id)

    if (!setting) {
      throw new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
    }
    try {
      const { actions } = setting || {}
      const newActions = await Promise.all(
        (actions || []).map(async (action) => {
          const img = await this.assetsRepository.findOne(action.image)
          if (img) {
            const imgResponse = AssetsMapper.toDto(img, this.configService)
            return {
              ...action,
              image: imgResponse
            }
          }
          return { ...action, image: undefined }
        })
      )

      return SettingMapper.toDto(setting, newActions, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async update(id: number, dto: UpdateSettingRequestDto) {
    try {
      const { image } = dto
      if (image) {
        const newPhoto = await this.assetsRepository.findOne(image)
        if (!newPhoto)
          throw new CommonException(
            ErrorType.PHOTO_NOT_FOUND,
            ErrorMessage.PHOTO_NOT_FOUND
          )
      }
      await this.settingRepository.update(id, dto)
      return await this.settingRepository.getById(id)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async delete(id: number) {
    try {
      return this.settingRepository.delete(id)
    } catch (error) {
      throw new CommonException(ErrorType.CATEGORY_NOT_FOUND, error.message)
    }
  }

  public async getVietNamCities() {
    try {
      const data = jsonReader('./src/common/master-data/tinh_tp.json')
      if (!isEmpty(data)) {
        const arrData = Object.values(data)
        const sortArr = arrData.sort((a: any, b: any) => {
          return a.code.localeCompare(b.code)
        })
        return sortArr
      }
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getVietNamDistricts(cityCode: string) {
    try {
      const data = jsonReader('./src/common/master-data/quan_huyen.json')
      if (!isEmpty(data)) {
        let arrData = Object.values(data)
        if (cityCode)
          arrData = arrData.filter((item: any) => item.parent_code === cityCode)
        const sortArr = arrData.sort((a: any, b: any) => {
          return a.code.localeCompare(b.code)
        })
        return sortArr
      }
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getVietNamWards(districtCode: string) {
    try {
      const data = jsonReader('./src/common/master-data/xa_phuong.json')
      if (!isEmpty(data)) {
        let arrData = Object.values(data)
        if (districtCode)
          arrData = arrData.filter(
            (item: any) => item.parent_code === districtCode
          )
        const sortArr = arrData.sort((a: any, b: any) => {
          return a.code.localeCompare(b.code)
        })
        return sortArr
      }
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
