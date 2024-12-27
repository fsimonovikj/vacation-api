import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { User } from "../../users/entities/user.entity";
import { VacationPlan } from "../../vacation-plan/entities/vacation-plan.entity";
import { VacationType } from "../../vacation/types/vacation-type";
import { VacationDay } from "../../vacation/entities/vacation.entity";

@Entity({ name: "leave_documentation" })
export class LeaveDocumentation extends BaseEntity {
  constructor(partial: Partial<LeaveDocumentation>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "int", nullable: false })
  days: number;

  @Column({ type: "date", nullable: true })
  startAt: Date;

  @Column({ type: "date", nullable: true })
  endAt: Date;

  @ManyToOne(() => User, (user) => user.vacationDecisions)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "uuid", nullable: false })
  userId: string;

  @Column({ type: "uuid", nullable: true })
  vacationId: string;

  @ManyToOne(() => VacationDay, (vacation) => vacation.vacationDecisions)
  vacation: VacationDay;

  @Column({
    type: "enum",
    enum: VacationType,
    nullable: false,
    default: VacationType.MACEDONIA,
  })
  type: VacationType;

  @Column({ type: "text", nullable: true })
  legalObligation: string; // To store the legal obligation or decision text

  @Column({ type: "varchar", nullable: true })
  filePath: string; // Path to the PDF file

  @Column({ type: "varchar", nullable: true })
  fileName: string; // Name of the PDF file
}
