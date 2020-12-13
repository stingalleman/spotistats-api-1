import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Stream } from "./Stream";
import { UserSettings } from "./UserSettings";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("text", { nullable: false })
  id: string;

  @Column("text", { nullable: false })
  displayName: string;

  @Column("bigint", { nullable: false, default: 0 })
  totalSeconds: bigint;

  // @OneToMany(() => Stream, (stream) => stream.user, {
  //   eager: true,
  //   nullable: true,
  // })
  // streams: Stream[];

  @Column("boolean", { nullable: false, default: false })
  disabled: boolean;

  @OneToOne(() => UserSettings, (userSettings) => userSettings.refreshToken, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "settings" })
  settings: UserSettings;
}
