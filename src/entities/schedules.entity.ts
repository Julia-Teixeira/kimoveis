import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RealState from "./realEstate.entity";
import User from "./user.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date | string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => RealState, (realEstate) => realEstate.schedules)
  realEstate: RealState;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
}

export default Schedule;
