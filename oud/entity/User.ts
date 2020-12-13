import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";

import { Stream } from "./Stream";

@Entity("users")
export class User extends BaseEntity {

	@PrimaryColumn("text", { nullable: false })
	id: string;

	@Column("text", { nullable: false })
	refreshToken: string;

	@Column("text", { nullable: true })
	playlistId: string;

    @OneToMany(() => Stream, stream => stream.user, { eager: true, nullable: true })
	streams: Stream[];

	@Column("jsonb", { nullable: false })
	settings: {
		disabled: boolean,
		error: string
	};
}