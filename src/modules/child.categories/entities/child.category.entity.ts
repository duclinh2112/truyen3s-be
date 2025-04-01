import { BaseEntity } from '@database/entities'
import { AssetsEntity } from 'src/modules/assets/assets.entity'
import { CategoryEntity } from 'src/modules/category/category.entity'
import { ComicsEntity } from 'src/modules/comics/entities/comic.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'child_categories' })
export class ChildCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

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
    name: 'description',
    type: 'longtext',
    nullable: true
  })
  description: string

  @ManyToOne(() => CategoryEntity, (categories) => categories.childCategories)
  @JoinColumn({ name: 'category_id' })
  category?: CategoryEntity

  // @ManyToOne(() => AssetsEntity, (image) => image.childCategories)
  // @JoinColumn({ name: 'image_id' })
  // image?: AssetsEntity

  @ManyToMany(() => ComicsEntity, (comics) => comics.childCategories)
  comics: ComicsEntity[]

  constructor(category?: Partial<ChildCategoryEntity>) {
    super()
    Object.assign(this, category)
  }
}
