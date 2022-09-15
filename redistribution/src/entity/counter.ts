/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Store } from "./store";

@Entity("counter")
export class Counter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  count: number;

  @OneToOne(() => Store, (store) => store.counter)
  store: Store;
}
