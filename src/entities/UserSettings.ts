import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity("usersettings")
export class UserSettings extends BaseEntity {
  @PrimaryColumn("text", { name: "refreshToken" })
  refreshToken: string;

  @Column("text", { name: "accessToken" })
  accessToken: string;

  @Column("timestamp", { name: "accessTokenExpiration" })
  accessTokenExpiration: Date;

  @Column("text", { name: "playlistId", nullable: true })
  playlistId: string;
}
