import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "health_cares" })
export class HealthCare extends BaseEntity {
  constructor(partial: Partial<HealthCare>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: "float", nullable: true })
  moodScore: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  lastCheckIn: Date;

  @ManyToOne(() => User, (user) => user.healthCares)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "uuid", nullable: false })
  userId: string;

  getUserId(): string {
    return this.user.id;
  }
}
