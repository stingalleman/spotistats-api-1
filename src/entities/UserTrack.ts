import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
// import { Track } from "./Track";

@Entity("usertracks")
export class UserTrack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    eager: false,
    nullable: false,
  })
  user: User;

  // @ManyToOne(() => Track, (track) => track.id, {
  //   cascade: false,
  //   eager: false,
  //   nullable: false,
  // })
  // track: Track;
  @Column("text", { nullable: false })
  trackName: number;
  @Column("text", { nullable: false })
  artistName: number;
  @Column("integer", { nullable: false })
  msPlayed: number;
  @Column("timestamp", { nullable: false })
  endTime: Date;

  // @Column("integer", { nullable: false, default: 0 })
  // count: number;

  // @Column("timestamp", { nullable: false })
  // firstStream: Date;

  // @Column("timestamp", { nullable: false })
  // lastStream: Date;
}
