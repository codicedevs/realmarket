export interface UserInfo {
  email: string;
  password: string;
}

export interface IUser {
  _id: number,
  documento: string,
  nombre: string,
  username: string,
  pass: string,
  accountId: string,
  email: string,
  telefono: string,
  resetKey: string,
  resetKeyTimeStamp: string
}