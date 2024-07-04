import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { UserStatus } from "../../core/enums/user-status.enum";
import { UserRole } from "../../core/enums/user-role.enum";
import { BookingDay } from "../../booking-days/entities/booking-day.entity";
import { BaseEntity } from "../../core/entities/base.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", nullable: false })
  firstName: string;

  @Column({ type: "varchar", nullable: false })
  lastName: string;

  @Column({ type: "varchar", nullable: true })
  middleName: string;

  @Column({ type: "varchar", nullable: false, unique: true, length: 50 })
  email: string;

  @Exclude()
  @Exclude({ toPlainOnly: true })
  @Column({ type: "varchar", length: 20, nullable: true })
  password: string;

  @Column({ type: "varchar", nullable: false })
  department: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.Pending,
  })
  status: UserStatus;

  @OneToMany(() => BookingDay, (booking) => booking.user)
  bookings: BookingDay[];
}
