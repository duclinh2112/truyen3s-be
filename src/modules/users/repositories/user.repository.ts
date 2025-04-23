import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { applyFilter, applyRange, applySort } from '@common/functions'

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  /**
   * Get users list
   * @param pagination {PaginationRequest}
   * @returns [userEntities: UserEntity[], totalUsers: number]
   */
  public getUsersAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[userEntities: UserEntity[], totalUsers: number]> {
    const { skip, perPage: take, sort, range, filter } = pagination
    const query = this.createQueryBuilder('users')
      .innerJoinAndSelect('users.roles', 'roles')
      .leftJoinAndSelect('users.permissions', 'permissions')
      .skip(skip)
      .take(take)

    applyFilter(query, filter, 'users', ['full_name', 'id', 'email', 'phone'])
    applySort(query, sort, 'users')
    applyRange(query, range, 'users')

    return query.getManyAndCount()
  }

  /**
   * find user by email
   * @param email {string}
   * @returns Promise<string>
   */
  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'r', 'r.active = true')
      .leftJoinAndSelect('r.permissions', 'rp', 'rp.active = true')
      .leftJoinAndSelect('u.permissions', 'p', 'p.active = true')
      .where('u.email = :email', { email: email })
      .getOne()
  }

  async findUserById(id: number): Promise<UserEntity> {
    return await this.createQueryBuilder('u')
      .leftJoinAndSelect('u.authorProfile', 'authorProfile')
      .leftJoinAndSelect('u.roles', 'r', 'r.active = true')
      .leftJoinAndSelect('r.permissions', 'rp', 'rp.active = true')
      .leftJoinAndSelect('u.permissions', 'p', 'p.active = true')
      .where('u.id = :id', { id: id })
      .getOne()
  }

  async getOneOrFail(value: string): Promise<UserEntity> {
    return await this.createQueryBuilder('users')
      .where('users.id = :id OR users.email = :email', {
        id: value,
        email: value
      })
      .getOneOrFail()
    // some code which fetch user entity or throw exception
  }
}
