import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input } from 'antd';
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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
  const { login, checkSession } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserInfo) => login(data);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className='wrapper'>
      <div className='login-container'>
        <div className='rm-logo' />
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Usuario"
            validateStatus={errors.user ? "error" : ""}
            help={errors.user?.message}
          >
            <Controller
              name="user"
              control={control}
              render={({ field }) => <Input {...field} className='input' />}
            />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  className='input'

                  iconRender={visible => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                />
              )}
            />
          </Form.Item>
          <div className='button-container'>
            <button className='button' onClick={handleSubmit(onSubmit)}>
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;