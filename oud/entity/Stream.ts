import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity("streams")
export class Stream extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.id, { eager: false, nullable: false })
	user: User;

	@Column("timestamp", { nullable: false })
	endTime: Date;

	@Column("text", { nullable: true })
	contextId: string;

	@Column("text", { nullable: true })
    artistName: string;
    
	@Column("text", { nullable: true })
    trackName: string;
    
	@Column("text", { nullable: true })
	msPlayed: bigint;
}