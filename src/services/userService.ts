// import "reflect-metadata";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { User } from "../models/user";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class UserService {
  protected repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }
  //   data:DeepPartial<User> = update or create

  async create(data: DeepPartial<User>): Promise<User> {
    const result: User = await this.repository.save(data);
    return result;
  }
  // recuperer un user en fonction d'un filtre
  async filterUser(filter: FindOptionsWhere<User>): Promise<User | null> {
    const list = await this.repository.findOne({ where: filter });
    return list;
  }
  async getAll(filter: FindOptionsWhere<User>): Promise<User[]> {
    const list: User[] = await this.repository.find({ where: filter });
    return list;
  }
  async delete(id: number): Promise<User> {
    const result: any = await this.repository.delete(id);
    return result;
  }
  async update(
    filter: FindOptionsWhere<User>,
    data: QueryDeepPartialEntity<User>
  ): Promise<User | null> {
    await this.repository.update(filter, data);
    const result = await this.repository.findOneBy(filter);
    return result;
  }
}
