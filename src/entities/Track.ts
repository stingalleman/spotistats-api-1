// import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
// import { UserTrack } from "./UserTrack";

// @Entity("tracks")
// export class Track extends BaseEntity {
//   @PrimaryColumn("text")
//   id: String;

//   @OneToMany(() => UserTrack, (userTrack) => userTrack.track, {
//     eager: false,
//     nullable: true,
//   })
//   streams: UserTrack[];

//   @Column("text")
//   name: String;

//   @Column("text")
//   artistId: String;

//   @Column("integer")
//   durationMs: number;

//   @Column("bool")
//   explicit: boolean;
// }
