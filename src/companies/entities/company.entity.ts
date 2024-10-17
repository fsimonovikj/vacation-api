import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "companies" })
export class Company extends BaseEntity {
  constructor(partial: Partial<Company>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  domains: string[];

  @Column({ type: "boolean", default: true })
  isActivated: boolean;

  @OneToMany(() => User, (user) => user.company, { onDelete: "CASCADE" })
  users: User[];

  @Column({ type: "varchar", length: "200", nullable: false, default: "" })
  notes: string;

  @ManyToMany(() => User, (user) => user.managedCompanies)
  @JoinTable({ name: "company_managers" }) // Creates the pivot table 'company_managers'
  managers: User[];
}
