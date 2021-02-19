import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { UserSettings } from "./UserSettings";
import { UserImport } from "./UserImport";
// import { UserStats } from "./UserStats";
// import { UserTrack } from "./UserTrack";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("text", { nullable: false })
  id: string;

  @Column("text", { nullable: false })
  displayName: string;

  @Column("boolean", { nullable: false, default: false })
  disabled: boolean;

  @OneToMany(() => UserImport, (userImport) => userImport.id, {
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: "imports" })
  imports: UserImport[];

  // @OneToMany(() => UserTrack, (userTrack) => userTrack.user, {
  //   eager: false,
  //   nullable: true,
  // })
  // streams: UserTrack[];

  @OneToOne(() => UserSettings, (userSettings) => userSettings.refreshToken, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: "settings" })
  settings: UserSettings;

  // @OneToOne(() => UserStats, (userStats) => userStats.id, {
  //   cascade: true,
  //   eager: false,
  // })
  // @JoinColumn({ name: "stats" })
  // stats: UserStats;
}
