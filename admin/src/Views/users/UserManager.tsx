import { ArrowLeftOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import userService from "../../service/user.service";
import { IUser } from "../../types/user.type";
import './users.css';

const schema = yup.object({
  nombre: yup
    .string()
    .required('El campo de nombre es obligatorio.'),
  username: yup
    .string()
    .required('El campo de nombre de usuario es obligatorio.'),
  password: yup
    .string()
    .required('El campo de contraseña es obligatorio.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  accountId: yup
    .number()
    .typeError('El ID de cuenta debe ser un número.')
    .required('El campo ID de cuenta es obligatorio.')
    .positive('El ID de cuenta debe ser un número positivo.')
    .integer('El ID de cuenta debe ser un número entero.'),
  telefono: yup
    .number()
    .typeError('El teléfono debe ser un número.')
    .required('El campo de teléfono es obligatorio.')
    .positive('El número de teléfono debe ser positivo.')
    .integer('El número de teléfono debe ser un número entero.'),
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido.')
    .required('El campo de correo electrónico es obligatorio.')
}).required();

const UserManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>()

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: user?.username || '',
      username: '',
      password: '',
      accountId: undefined,
      telefono: undefined,
      email: ''
    }
  });

  const onSubmit = (data: IUser) => {
    if (id) {
      console.log('editando')
    } else {
      console.log("creando")
    }
    console.log(data);
  };

  const goBack = () => {
    navigate("/user")
  }

  const bringUser = async () => {
    if (id) {
      const res = await userService.getUserById(id)
      setUser(res.data)
    }
  }

  useEffect(() => {
    bringUser()
  }, [id])

  useEffect(() => {
    // Asegúrate de que user no es nulo y contiene los datos necesarios antes de llamar a reset
    if (user) {
      reset({
        nombre: user.nombre,
        username: user.username || '',  // Asumiendo que estos campos pueden no estar presentes
        password: user.pass,
        accountId: Number(user.accountId),
        telefono: Number(user.telefono),
        email: user.email || ''
      });
    }
  }, [user, reset]);

  return (
    <div className="form-container">
      <div className="title-container">
        <ArrowLeftOutlined className="back-icon" onClick={() => goBack()} />
        <text className="title">
          {id ?
            'Edición de usuario' : 'Creación de usuario'
          }
        </text>
      </div>
      <Form
        layout="vertical"
        autoComplete="off"
        className="form"
        onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Nombre"
          name="nombre"
          help={errors.nombre?.message}
          validateStatus={errors.nombre ? "error" : ""}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa el nombre completo" />}
          />
        </Form.Item>

        <Form.Item
          label="Nombre de Usuario"
          name="username"
          help={errors.username?.message}
          validateStatus={errors.username ? "error" : ""}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa un nombre de usuario" />}
          />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          help={errors.password?.message}
          validateStatus={errors.password ? "error" : ""}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} className="creation-input" placeholder="Ingresa una contraseña" />}
          />
        </Form.Item>

        <Form.Item
          label="ID de Cuenta"
          name="accountId"
          help={errors.accountId?.message}
          validateStatus={errors.accountId ? "error" : ""}>
          <Controller
            name="accountId"
            control={control}
            render={({ field }) => <InputNumber {...field} className="creation-input" placeholder="Ingresa el ID de cuenta" />}
          />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="telefono"
          help={errors.telefono?.message}
          validateStatus={errors.telefono ? "error" : ""}>
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => <InputNumber {...field} className="creation-input" placeholder="Ingresa el teléfono" />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          help={errors.email?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa el email" />}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="addButton">
          {id ?
            'Editar usuario' : 'Agregar usuario'
          }
        </Button>
      </Form>
    </div>
  )
}

export default UserManager