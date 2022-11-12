import { Entity, BaseEntity, Column, JoinColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
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
