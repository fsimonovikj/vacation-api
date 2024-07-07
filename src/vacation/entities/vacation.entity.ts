import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "vacation" })
export class VacationDay extends BaseEntity {
  constructor(partial: Partial<VacationDay>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "numeric", nullable: false })
  days: number;

  @Column({ type: "date", nullable: true })
  startAt: Date;

  @Column({ type: "date", nullable: true })
  endAt: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "uuid", nullable: false })
  userId: string;

  getUserId(): string {
    return this.user.id;
  }
}
