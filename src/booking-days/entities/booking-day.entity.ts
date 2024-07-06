import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { User } from "../../users/entities/user.entity";
import { VacationDay } from "../../vacation/entities/vacation.entity";

@Entity({ name: "booking-days" })
export class BookingDay extends BaseEntity {
  constructor(partial: Partial<BookingDay>) {
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

  @Column({ type: "numeric", nullable: true })
  bookedDays: number;

  @Column({ type: "varchar", nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "uuid", nullable: false })
  userId: string;

  @ManyToOne(() => VacationDay, (vacation) => vacation.bookings)
  @JoinColumn({ name: "vacationId" })
  vacation: VacationDay;

  @Column({ type: "uuid", nullable: false })
  vacationId: string;

  getUserId(): string {
    return this.user.id;
  }
}
