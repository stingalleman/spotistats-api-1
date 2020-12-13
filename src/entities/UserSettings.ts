import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity("usersettings")
export class UserSettings extends BaseEntity {
  @PrimaryColumn({ name: "refreshToken" })
  refreshToken: string;

  @Column({ name: "accessToken" })
  accessToken: string;

  @Column({ name: "accessTokenExpiration" })
  accessTokenExpiration: Date;

  @Column({ name: "playlistId", nullable: true })
  playlistId: Date;
}
