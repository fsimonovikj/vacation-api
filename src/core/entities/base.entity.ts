import {
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  DeleteDateColumn,
} from "typeorm";
export abstract class BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  // @Column({
  //   type: "timestamp",
  //   nullable: true,
  // })
  // deletedAt: Date | null;

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;
}
