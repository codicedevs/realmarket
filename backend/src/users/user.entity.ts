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
  @Column()
  email: string;
  @Column()
  telefono: string;
  @Column()
  resetKey: number;
  @Column()
  resetKeyTimeStamp: string;
  @Column()
  isActive: boolean;

  //   tipoDocumento: string;
  // cuit?: string;
  //   tipoPersona: 'FISICA';
  //   relacion: string;
  //   residencia: {
  //     codigoPais: string;
  //     autorizadoOperar: string;
  //     motivo: string;
  //   };
  //   sectorEconomia: string;
  //   esGobierno: string;
  //   inversorCalificado: string;
}
