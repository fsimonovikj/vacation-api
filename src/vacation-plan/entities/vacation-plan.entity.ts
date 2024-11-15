import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { VacationDay } from "../../vacation/entities/vacation.entity";
import { VacationType } from "../../vacation/types/vacation-type";

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
  days: number;

  @OneToMany(() => VacationDay, (vacation) => vacation.plan)
  vacations: VacationDay[];

  @Column({
    type: "enum",
    enum: VacationType,
    nullable: false,
    default: VacationType.MACEDONIA,
  })
  type: VacationType;

  getVacations(): VacationDay[] {
    return this.vacations;
  }
}
