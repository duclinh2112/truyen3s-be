import { BaseEntity } from '@database/entities'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ComicsEntity } from '../comics/entities/comic.entity'
import { ChildCategoryEntity } from '../child.categories/entities/child.category.entity'

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
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

  @OneToMany(
    () => ChildCategoryEntity,
    (childCategories) => childCategories.category
  )
  childCategories: ChildCategoryEntity[]

  // @ManyToOne(() => AssetsEntity, (image) => image.categories)
  // @JoinColumn({ name: 'image_id' })
  // image?: AssetsEntity

  @OneToMany(() => ComicsEntity, (comics) => comics.category)
  comics: ComicsEntity[]

  constructor(category?: Partial<CategoryEntity>) {
    super()
    Object.assign(this, category)
  }
}
