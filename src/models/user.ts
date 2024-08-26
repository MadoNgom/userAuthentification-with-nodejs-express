import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string | number;
  @Column()
  name!: string;
  @Column()
  lastname!: string;
  @Column()
  email!: string;
  @Column()
  password!: string;
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = this;
    return rest;
  }
}
