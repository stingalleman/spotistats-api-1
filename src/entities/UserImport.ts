import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity("userimport")
export class UserImport extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user: string;

  @Column()
  selfLink: string;

  @Column()
  mediaLink: string;

  @Column()
  name: string;

  @Column()
  bucket: string;

  @Column()
  generation: string;

  @Column()
  metageneration: string;

  @Column()
  contentType: string;

  @Column()
  storageClass: string;

  @Column()
  size: string;

  @Column()
  md5Hash: string;

  @Column()
  contentEncoding: string;

  @Column()
  cacheControl: string;

  @Column()
  crc32c: string;

  @Column()
  etag: string;

  @Column()
  timeCreated: string;

  @Column()
  updated: string;

  @Column()
  timeStorageClassUpdated: string;
}
