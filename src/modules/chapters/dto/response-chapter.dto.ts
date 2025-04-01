import { ApiProperty } from '@nestjs/swagger'
import { ResponseComicDto } from 'src/modules/comics/dto/response-comic.dto'

export class ResponseChapterDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  stt: number

  @ApiProperty()
  name: string

  @ApiProperty()
  slug: string

  @ApiProperty()
  content: string

  @ApiProperty()
  comic: ResponseComicDto
}
