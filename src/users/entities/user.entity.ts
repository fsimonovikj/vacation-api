import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { UserStatus } from "../../core/enums/user-status.enum";
import { UserRole } from "../../core/enums/user-role.enum";
import { BookingDay } from "../../booking-days/entities/booking-day.entity";
import { BaseEntity } from "../../core/entities/base.entity";
import { UserDepartment } from "../../core/enums/user-department";
import { Company } from "../../companies/entities/company.entity";
import { VacationType } from "../../vacation/types/vacation-type";

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

  @Column({ type: "enum", enum: UserDepartment, default: UserDepartment.Other })
  department: UserDepartment;

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

  @Column({ type: "uuid", nullable: false })
  companyId: string;

  @ManyToOne(() => Company, (company) => company.users, { onDelete: "CASCADE" })
  company: Company;

  @ManyToMany(() => Company, (company) => company.managers)
  managedCompanies: Company[];

  @Column({
    type: "enum",
    enum: VacationType,
    default: VacationType.MACEDONIA,
    nullable: false,
  })
  type: VacationType;
}
