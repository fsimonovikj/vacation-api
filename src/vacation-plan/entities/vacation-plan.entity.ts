import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { VacationDay } from "../../vacation/entities/vacation.entity";

@Entity({ name: "vacation-plan" })
export class VacationPlan extends BaseEntity {
  constructor(partial: Partial<VacationPlan>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "date", nullable: true })
  start: Date;

  @Column({ type: "date", nullable: true })
  end: Date;

  @Column({ type: "int", nullable: false })
  days: Number;

  @OneToMany(() => VacationDay, (vacation) => vacation.plan)
  vacations: VacationDay[];

  getVacations(): VacationDay[] {
    return this.vacations;
  }
}
