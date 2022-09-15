/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  BaseEntity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Counter } from "./counter";
import { User } from "./user";

@Entity("store")
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  token: string;

  @OneToMany(() => User, (user) => user.store)
  users: User[];

  @OneToOne(() => Counter, (counter) => counter.store, { cascade: true })
  @JoinColumn()
  counter: Counter;
}
