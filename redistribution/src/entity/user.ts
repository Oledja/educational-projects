import { Entity, BaseEntity, Column, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import type { Store } from "./store";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @ManyToOne("store")
  store: Store;
}
