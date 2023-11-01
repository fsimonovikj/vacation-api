import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";

@Entity({ name: "holidays" })
export class Holiday extends BaseEntity {
  constructor(partial: Partial<Holiday>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "date", nullable: true })
  start: Date;

  @Column({ type: "date", nullable: true })
  end: Date;
}
