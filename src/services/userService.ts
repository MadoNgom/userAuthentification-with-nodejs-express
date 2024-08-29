// import "reflect-metadata";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { User } from "../models/user";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AbstractService } from "./abstactService";

export class UserService extends AbstractService<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }
}
