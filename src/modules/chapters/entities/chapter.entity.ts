import { BaseEntity } from '@database/entities'
import { ComicsEntity } from 'src/modules/comics/entities/comic.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'chapters' })
export class ChapterEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'stt',
    type: 'int'
  })
  stt: number

  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string

  @Column({
    name: 'slug',
    type: 'varchar',
    unique: true
  })
  slug: string

  @Column({
    name: 'content',
    type: 'longtext'
  })
  content: string

  @ManyToOne(() => ComicsEntity, (comic) => comic.chapters)
  @JoinColumn({ name: 'comic_id' })
  comic: ComicsEntity

  constructor(chapters?: Partial<ChapterEntity>) {
    super()
    Object.assign(this, chapters)
  }
}
