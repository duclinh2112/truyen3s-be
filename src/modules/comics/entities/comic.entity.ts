import { BaseEntity } from '@database/entities'
import { AssetsEntity } from 'src/modules/assets/assets.entity'
import { CategoryEntity } from 'src/modules/category/category.entity'
import { ChapterEntity } from 'src/modules/chapters/entities/chapter.entity'
import { ChildCategoryEntity } from 'src/modules/child.categories/entities/child.category.entity'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'comics' })
export class ComicsEntity extends BaseEntity {
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
    type: 'longtext'
  })
  description: string

  @Column({
    name: 'price',
    type: 'decimal',
    nullable: true
  })
  price: number

  @ManyToOne(() => UserEntity, (user) => user.comics)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity

  @ManyToOne(() => AssetsEntity)
  @JoinColumn({ name: 'image_id' })
  image: AssetsEntity

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column({
    name: 'view',
    type: 'int',
    nullable: true,
    default: 0
  })
  view: number

  @Column({
    name: 'is_hot',
    type: 'boolean',
    nullable: true,
    default: false
  })
  isHot: boolean

  @Column({
    name: 'is_recommend',
    type: 'boolean',
    nullable: true,
    default: false
  })
  isRecommend: boolean

  @Column({
    name: 'is_full',
    type: 'boolean',
    nullable: true,
    default: false
  })
  isFull: boolean

  @ManyToMany(
    () => ChildCategoryEntity,
    (childCategories) => childCategories.comics
  )
  @JoinTable({
    name: 'comics_child_categories',
    joinColumn: {
      name: 'comic_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'child_category_id',
      referencedColumnName: 'id'
    }
  })
  childCategories: ChildCategoryEntity[]

  @OneToMany(() => ChapterEntity, (chapter) => chapter.comic)
  chapters: ChapterEntity[]

  constructor(comic?: Partial<ComicsEntity>) {
    super()
    Object.assign(this, comic)
  }
}
