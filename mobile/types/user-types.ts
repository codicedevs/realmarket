interface IUser {
  id:number,
  documento:string,
  nombre:string,
  username:string,
  pass:string,
  accountId:string,
  email:string,
  telefono:string,
  resetKey:string,
  resetKeyTimeStamp:string
}

interface EditUserParams {
  id: number;
  body: Partial<IUser>
}