import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userstats")
export class UserStats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("bigint", { nullable: false, default: 0 })
  totalSeconds: bigint;
}
