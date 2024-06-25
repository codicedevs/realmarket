import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useAuth } from "../../Context/auth";
import { UserInfo } from "../../types/user.type";
import './Login.css';

const schema = yup.object({
  user: yup
    .string()
    .required('El campo de usuario es obligatorio.'),
  password: yup
    .string()
    .required('El campo de contraseña es obligatorio.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
}).required();

const Login = () => {

  const { login, checkSession } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: UserInfo) => login(data)

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <div className='wrapper'>
      <div className='login-container'>
        <div className='rm-logo' />
        <div className='input-container'>
          <input placeholder='Usuario' className='input' {...register("user")} />
          <p className="error-message">{errors.user?.message}</p>
          <input placeholder='Contraseña' className='input' {...register("password")} />
          <p className="error-message">{errors.password?.message}</p>
        </div>
        <div className='button-container'>
          <button className='button' onClick={handleSubmit(onSubmit)}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login