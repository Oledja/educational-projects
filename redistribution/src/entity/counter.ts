import { BaseEntity, Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
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
