/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from 'sequelize-typescript';
import { None, Option, Some } from 'oxide.ts';
import {
  AggregateRoot,
  Mapper,
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '../ddd';
import { LoggerPort } from '../ports/logger.port';
import { Service } from 'typedi';
import { EventEmmiter } from '../core/event-emmiter/event-emmiter';

@Service()
export abstract class SequelizeRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends Model,
> implements RepositoryPort<Aggregate>
{
  // protected abstract model: any;

  protected constructor(
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly model: any,
    protected readonly eventEmmiter: EventEmmiter,
    protected readonly logger: LoggerPort,
  ) {}

  async findOneById(id: string): Promise<Option<Aggregate>> {
    const result = await this.model.findOne({ where: { id } });

    return result ? Some(this.mapper.toDomain(result)) : None;
  }

  async findAll(): Promise<Aggregate[]> {
    const result = await this.model.findAll();

    return result.map(this.mapper.toDomain);
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Aggregate>> {
    const result = await this.model.findAll({
      limit: params.limit,
      offset: params.offset,
    });

    const entities = result.map(this.mapper.toDomain);

    return new Paginated({
      data: entities,
      count: result.length,
      limit: params.limit,
      page: params.page,
    });
  }

  async delete(entity: Aggregate): Promise<boolean> {
    entity.validate();

    const result = await this.model.destroy({ where: { id: entity.id } });

    return result > 0;
  }

  /**
   * Inserts an entity to a database
   * (also publishes domain events and waits for completion)
   */
  async insert(entity: Aggregate): Promise<void> {
    const record = this.mapper.toPersistence(entity);

    try {
      await this.model.create(record.dataValues);
      entity.publishEvents(this.logger, this.eventEmmiter);
    } catch (error) {
      // this.logger.error(error);
      throw error;
    }
  }
}
