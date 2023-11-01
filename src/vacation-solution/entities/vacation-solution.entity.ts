import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";

@Entity({ name: "vacation-solution" })
export class VacationSolution extends BaseEntity {
  constructor(partial: Partial<VacationSolution>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "date", nullable: true })
  start: Date;

  @Column({ type: "date", nullable: true })
  end: Date;
}
