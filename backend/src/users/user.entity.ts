import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  documento: string;
  @Column()
  nombre: string;
  @Column()
  username: string;
  @Column()
  pass: string;
  @Column()
  accountId: string;
  @Column({ unique: true })
  email: string;
  @Column()
  telefono: string;
  @Column()
  resetKey: number;
  @Column()
  resetKeyTimeStamp: string;
  @Column({ default: true })
  isActive: boolean = true;

}
